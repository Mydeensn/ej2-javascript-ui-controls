/**
 * Grid Clipboard spec document
 */
import { Browser } from '@syncfusion/ej2-base';
import { Grid } from '../../../src/grid/base/grid';
import { Selection } from '../../../src/grid/actions/selection';
import { Clipboard } from '../../../src/grid/actions/clipboard';
import { employeeData, filterData } from '../base/datasource.spec';
import { BeforeCopyEventArgs } from '../../../src/grid/base/interface';
import { createGrid, destroy, getKeyActionObj } from '../base/specutil.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';
import  {profile , inMB, getMemoryProfile} from '../base/common.spec';

Grid.Inject(Selection, Clipboard);

describe('Grid clipboard copy testing - row type selection => ', () => {
    let gridObj: Grid;
    beforeAll((done: Function) => {
        const isDef = (o: any) => o !== undefined && o !== null;
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                this.skip(); //Skips test (in Chai)
            }
        gridObj = createGrid(
            {
                dataSource: employeeData, 
                columns: [
                    { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 135, },
                    { field: 'FirstName', headerText: 'Name', width: 125 },
                    { field: 'Title', headerText: 'Title', width: 180 },
                ],
                allowSelection: true,
                selectionSettings: { type: 'Multiple' }
            }, done);
    });

    it('Check hidden clipboard textarea', () => {
        let clipArea: HTMLElement = (gridObj.element.querySelectorAll('.e-clipboard')[0] as HTMLElement);
        expect(gridObj.element.querySelectorAll('.e-clipboard').length > 0).toBeTruthy();
        expect(clipArea.style.opacity === '0').toBeTruthy();
    });

    it('Check with row type selection', () => {
        gridObj.selectRows([0, 1]);
        gridObj.copy();
        expect((document.querySelector('.e-clipboard') as HTMLInputElement).value
            === '1	Nancy	Sales Representative\n2	Andrew	Vice President, Sales').toBeTruthy();
    });

    it('Check with row type selection - include header', () => {
        gridObj.copy(true);
        expect((document.querySelector('.e-clipboard') as HTMLInputElement).value
            === 'Employee ID	Name	Title\n1	Nancy	Sales Representative\n2	Andrew	Vice President, Sales').toBeTruthy();
    });

    it('Browser default selection for coverage', () => {
        let range: any = document.createRange();
        range.selectNodeContents(gridObj.element.querySelectorAll('.e-rowcell')[2]);
        let selection: any = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        gridObj.copy();
        selection.removeAllRanges();
    });

    it('Check with row type selection in iOS Device', () => {
        let iphoneUa: string = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6' +
            ' (KHTML, like Gecko) Version/10.0 Mobile/14D27 Safari/602.1';
        let browUa: string = Browser.userAgent;
        Browser.userAgent = iphoneUa;
        gridObj.copy();
        expect((document.querySelector('.e-clipboard') as HTMLInputElement).value
            === '1	Nancy	Sales Representative\n2	Andrew	Vice President, Sales').toBeTruthy();
        Browser.userAgent = browUa;
    });

    it('Check clipboard area after destroy', () => {
        gridObj.clipboardModule.destroy();
        expect(document.querySelectorAll('.e-clipboard').length === 0).toBeTruthy();
    });

    afterAll(() => {
       destroy(gridObj);
       gridObj = null;
    });
});

describe('Grid clipboard copy testing - cells type selection => ', () => {
    let gridObj: Grid;
    let gridBeforeCopy: (e: BeforeCopyEventArgs) => void;
    beforeAll((done: Function) => {
        gridObj = createGrid(
            {
                dataSource: employeeData,
                columns: [
                    { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 135, },
                    { field: 'FirstName', headerText: 'Name', width: 125 },
                    { field: 'Title', headerText: 'Title', width: 180 },
                ],
                allowSelection: true,
                selectionSettings: { type: 'Multiple', mode: 'Cell' },
                beforeCopy: gridBeforeCopy
            }, done);
    });

    it('Check with cells type selection', () => {
        gridObj.selectionModule.selectCells([{
            rowIndex: 0,
            cellIndexes: [0, 1]
        }, {
            rowIndex: 1,
            cellIndexes: [1, 2]
        }]);
        gridObj.copy();
        expect((document.querySelector('.e-clipboard') as HTMLInputElement).value
            === '1\nNancy\nAndrew\nVice President, Sales').toBeTruthy();
    });

    it('Check with row type selection - include header', () => {
        gridObj.selectionModule.selectCells([{
            rowIndex: 0,
            cellIndexes: [0, 1]
        }, {
            rowIndex: 1,
            cellIndexes: [1, 2]
        }])
        gridObj.copy(true);
        expect((document.querySelector('.e-clipboard') as HTMLInputElement).value
            === 'Employee ID\n1\nName\nNancy\nName\nAndrew\nTitle\nVice President, Sales').toBeTruthy();
    });

    it('Check with ctrlPlusC key press', () => {                
        gridObj.keyboardModule.keyAction(getKeyActionObj('ctrlPlusC'));
        expect((document.querySelector('.e-clipboard') as HTMLInputElement).value
            === '1\nNancy\nAndrew\nVice President, Sales').toBeTruthy();
    });

    it('Check with ctrlShiftPlusH key press', () => {
        gridObj.keyboardModule.keyAction(getKeyActionObj('ctrlShiftPlusH'));
        expect((document.querySelector('.e-clipboard') as HTMLInputElement).value
            === 'Employee ID\n1\nName\nNancy\nName\nAndrew\nTitle\nVice President, Sales').toBeTruthy();        
        gridObj.keyboardModule.keyAction(getKeyActionObj('space', document.querySelector('.e-clipboard') as HTMLInputElement));
    });

    it('Check with args cancel for coverage', () => {
        gridBeforeCopy = (args: BeforeCopyEventArgs): void => {
            args.cancel = true;
        };
        gridObj.beforeCopy = gridBeforeCopy;
        gridObj.copy();
    });

    afterAll(() => {
       destroy(gridObj);
       gridObj = gridBeforeCopy = null;
    });
});

describe('Clipboard copy testing while Freezing columns => ', () => {
    let gridObj: Grid;
    beforeAll((done: Function) => {
        gridObj = createGrid(
            {
                dataSource: filterData,
                allowPaging: true,
                selectionSettings: { type: 'Multiple' },
                columns: [
                    { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', freeze : 'Right' },
                    { field: 'CustomerID', headerText: 'Customer Name', width: 150 },
                    { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right' },
                    { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right' }
                ],
                pageSettings: { pageCount: 5 }
            }, done);
    });

    it('Check the copy value', () => {
        gridObj.selectRows([1]);
        gridObj.copy(true);
        expect((document.querySelector('.e-clipboard') as HTMLInputElement).value
            === 'Customer Name\tOrder Date\tFreight\tOrder ID\nTOMSP\t7/12/1996\t$11.61\t10249').toBeTruthy();
    });

    afterAll(() => {
       destroy(gridObj);
    });
});

    describe('EJ2-7314/7299===>Grid clipboard => ', () => {
        let gridObj: Grid;
        beforeAll((done: Function) => {
            gridObj = createGrid(
                {
                    dataSource: employeeData,
                    columns: [
                        { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 135, },
                        { field: 'FirstName', headerText: 'Name', width: 125 },
                        { field: 'Title', headerText: 'Title', visible: false, width: 180 },
                        { field: 'Region', headerText: 'Region', width: 180 },
                        { field: 'Country', headerText: 'Country', width: 180 }
                    ],
                    allowSelection: true,
                    selectionSettings: { type: 'Multiple' }
                }, done);
        });

        it('EJ2-7299===>Hiding one column and copying the rows', () => {
            gridObj.selectRow(0, true);
            gridObj.copy();
            expect((gridObj.element.querySelector('.e-clipboard') as HTMLInputElement).value
                === '1	Nancy	WA	USA').toBeTruthy();
            gridObj.copy(true);
            expect((gridObj.element.querySelector('.e-clipboard') as HTMLInputElement).value
                === 'Employee ID	Name	Region	Country\n1	Nancy	WA	USA').toBeTruthy();
        });
        it('memory leak', () => {     
            profile.sample();
            let average: any = inMB(profile.averageChange)
            //Check average change in memory samples to not be over 10MB
            expect(average).toBeLessThan(10);
            let memory: any = inMB(getMemoryProfile())
            //Check the final memory usage against the first usage, there should be little change if everything was properly deallocated
            expect(memory).toBeLessThan(profile.samples[0] + 0.25);
        });   

        afterAll(() => {
            destroy(gridObj);
            gridObj = null;
        });
    });
