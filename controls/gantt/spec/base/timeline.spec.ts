/**
 * Gantt base spec
 */
import { createElement, remove, extend } from '@syncfusion/ej2-base';
import { Gantt, Toolbar, Edit } from '../../src/index';
import { defaultGanttData, zoomData, zoomData1 } from './data-source.spec';
import { createGantt, destroyGantt, triggerMouseEvent } from './gantt-util.spec';
import * as cls from '../../src/gantt/base/css-constants';

describe('Gantt-Timeline', () => {

    describe('Gantt base module', () => {
        Gantt.Inject(Toolbar, Edit);
        let ganttObj: Gantt;

        beforeAll((done: Function) => {
            ganttObj = createGantt({
                dataSource: defaultGanttData,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'Children',
                },
                splitterSettings: {
                    position: '100%'
                },
                toolbar: ['ZoomIn', 'ZoomOut', 'ZoomToFit', 'PrevTimeSpan', 'NextTimeSpan'],
                projectStartDate: new Date('01/28/2018'),
                projectEndDate: new Date('03/24/2018'),
            }, done);
        });
        afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });

        //None
        it('Default Mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "None";
            ganttObj.timelineSettings.bottomTier.unit = "None";
            ganttObj.timelineSettings.timelineViewMode = "None";
            ganttObj.load = function () {
                this.isTimelineRoundOff = true;
            };
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("1/28/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("3/25/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });

        //timelineViewMode
        it('Timeline in Year-Month Mode', (done: Function) => {
            ganttObj.timelineSettings.timelineViewMode = "Year";
            ganttObj.timelineSettings.bottomTier.count = 0;
            ganttObj.timelineSettings.topTier.format = '';
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("MMM yyyy");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy').toString()).toBe("1/1/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("1/1/2019");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Month-Week Mode', (done: Function) => {
            ganttObj.timelineSettings.timelineViewMode = "Month";
            ganttObj.timelineSettings.topTier.count = 1;
            ganttObj.timelineSettings.topTier.format = '';
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("1/1/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("4/1/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Week-Day Mode', (done: Function) => {
            ganttObj.timelineSettings.timelineViewMode = "Week";
            ganttObj.timelineSettings.weekStartDay = 3;
            ganttObj.timelineSettings.weekendBackground = 'red';
            ganttObj.timelineSettings.topTier.format = '';
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("1/24/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("3/28/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Day-Hour Mode', (done: Function) => {
            ganttObj.timelineSettings.timelineViewMode = "Day";
            ganttObj.timelineSettings.topTier.format = '';
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Hour");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("H");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("1/28/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("3/25/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Hour-Minutes Mode', (done: Function) => {
            ganttObj.projectStartDate = "01/28/2018";
            ganttObj.projectEndDate = "02/05/2018";
            ganttObj.timelineSettings.timelineViewMode = "Hour";
            ganttObj.timelineSettings.topTier.format = '';
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Hour");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Minutes");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("H");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("m");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("1/28/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("2/5/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        }, 6000);
        it('Timeline in Minutes Mode only', function (done: Function) {
            ganttObj.projectStartDate = "02/02/2018";
            ganttObj.projectEndDate = "02/05/2018";
            ganttObj.timelineSettings.timelineViewMode = "Minutes";
            ganttObj.timelineSettings.topTier.format = '';
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Minutes");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("None");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("m");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("2/2/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("2/5/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(1);
                done();
            }
            ganttObj.refresh();
        }, 6000);

        //Tiers
        // Year Mode
        it('Year in topTier only', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Year";
            ganttObj.timelineSettings.bottomTier.unit = "None";
            ganttObj.timelineSettings.topTier.format = 'yyyy';
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("None");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("1/1/2018");
                // expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("1/1/2019");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(1);
                done();
            }
            ganttObj.refresh();
        }, 1000);
        it('Year in both tier', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Year";
            ganttObj.timelineSettings.bottomTier.unit = "Year";
            ganttObj.timelineSettings.bottomTier.count = 5;
            ganttObj.timelineSettings.topTier.format = '';
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("yyyy");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Year-Month Mode with large count value', (done: Function) => {
            ganttObj.timelineSettings.bottomTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.count = 25;
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(12);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("MMM yyyy");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Year-Week Mode with large count value', (done: Function) => {
            ganttObj.timelineSettings.bottomTier.unit = "Week";
            ganttObj.timelineSettings.bottomTier.count = (25 * 4);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(48);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Year-Day Mode with large count value', (done: Function) => {
            ganttObj.timelineSettings.bottomTier.unit = "Day";
            ganttObj.timelineSettings.bottomTier.count = (25 * 4 * 30);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(336);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Year-Hour Mode with large count value', (done: Function) => {
            ganttObj.timelineSettings.bottomTier.unit = "Hour";
            ganttObj.timelineSettings.bottomTier.count = (25 * 4 * 30 * 24);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Hour");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(8064);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("H");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Year-Minutes Mode with large count value', (done: Function) => {
            ganttObj.timelineSettings.bottomTier.unit = "Minutes";
            ganttObj.timelineSettings.bottomTier.count = (25 * 4 * 30 * 24 * 60);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Minutes");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(483840);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("m");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Year-Week Mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Year";
            ganttObj.timelineSettings.bottomTier.unit = "Week";
            ganttObj.timelineSettings.bottomTier.format = 'M/dd';
            ganttObj.timelineSettings.topTier.count = 1;
            ganttObj.timelineSettings.bottomTier.count = 1;
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("M/dd");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Year-Day Mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Year";
            ganttObj.timelineSettings.bottomTier.unit = "Day";
            ganttObj.timelineSettings.bottomTier.format = 'd';
            ganttObj.timelineSettings.bottomTier.count = 30;
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(30);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("d");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Year-Hour Mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Year";
            ganttObj.timelineSettings.bottomTier.unit = "Hour";
            ganttObj.timelineSettings.bottomTier.format = 'H';
            ganttObj.timelineSettings.bottomTier.count = (30 * 24);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Hour");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(720);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("H");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Year-Minutes Mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Year";
            ganttObj.timelineSettings.bottomTier.unit = "Minutes";
            ganttObj.timelineSettings.bottomTier.format = 'm';
            ganttObj.timelineSettings.bottomTier.count = (30 * 24 * 60);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Year");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Minutes");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(43200);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("m");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        // Month
        it('Month in Toptier only', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.unit = "None";
            ganttObj.timelineSettings.bottomTier.format = '';
            ganttObj.timelineSettings.topTier.format = 'M';
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("None");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("M");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("2/1/2018");
                // expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("3/1/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(1);
                done();
            }
            ganttObj.refresh();
        }, 1000);
        it('Month in both tier with invalid bottomtier count', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.unit = "Month";
            ganttObj.timelineSettings.topTier.format = '';
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("MMM yyyy");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Month in both tier with valid bottomtier count', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.count = 1;
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("MMM yyyy");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Month-Week Mode with large bottomtier count', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.unit = "Week";
            ganttObj.timelineSettings.bottomTier.count = 6;
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(4);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Month-Day Mode with large bottomtier count', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.unit = "Day";
            ganttObj.timelineSettings.bottomTier.count = (6 * 7);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(28);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Month-Hour Mode with large bottomtier count', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.unit = "Hour";
            ganttObj.timelineSettings.bottomTier.count = (6 * 7 * 24);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Hour");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(672);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("H");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Month-Minutes Mode with large bottomtier count', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.unit = "Minutes";
            ganttObj.timelineSettings.bottomTier.count = (6 * 7 * 24 * 60);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Minutes");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(40320);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("m");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Month-Day Mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.unit = "Day";
            ganttObj.timelineSettings.bottomTier.count = 1;
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Month-Hour Mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.unit = "Hour";
            ganttObj.timelineSettings.bottomTier.count = (24);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Hour");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(24);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("H");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Month-Minutes Mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.unit = "Minutes";
            ganttObj.timelineSettings.bottomTier.count = (24 * 60);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Month");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Minutes");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1440);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("m");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        //Week
        it('Week in toptier only', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Week";
            ganttObj.timelineSettings.bottomTier.unit = "None";
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("None");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("1/31/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("2/14/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(1);
                done();
            }
            ganttObj.refresh();
        });
        it('Week in both tier', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Week";
            ganttObj.timelineSettings.bottomTier.unit = "Month";
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Week in both tier', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Week";
            ganttObj.timelineSettings.bottomTier.unit = "Week";
            ganttObj.timelineSettings.bottomTier.count = 1;
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Week-Day Mode with invalid weekstartday', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "None";
            ganttObj.timelineSettings.bottomTier.unit = "None";
            ganttObj.timelineSettings.timelineViewMode = "Week";
            ganttObj.timelineSettings.weekStartDay = 7;
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("1/28/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("2/18/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Week-Day Mode with valid weekstartday', (done: Function) => {
            ganttObj.timelineSettings.timelineViewMode = "Week";
            ganttObj.timelineSettings.weekStartDay = 6;
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("1/27/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("2/17/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Week-Hour Mode with large bottomtier count', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Week";
            ganttObj.timelineSettings.bottomTier.unit = "Hour";
            ganttObj.timelineSettings.bottomTier.count = (24 * 8);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Hour");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(168);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("H");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("1/27/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("2/17/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Week-Minutes Mode with large bottomtier count', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Week";
            ganttObj.timelineSettings.bottomTier.unit = "Minutes";
            ganttObj.timelineSettings.bottomTier.count = (24 * 8 * 60);
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Minutes");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(10080);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("m");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Week-Hour Mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Week";
            ganttObj.timelineSettings.bottomTier.unit = "Hour";
            ganttObj.timelineSettings.bottomTier.count = 24;
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Hour");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(24);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("H");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Week-Minutes Mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Week";
            ganttObj.timelineSettings.bottomTier.unit = "Minutes";
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Minutes");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(24);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("MMM dd, yyyy");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("m");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        //Day
        it('Day in bottomTier only', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "None";
            ganttObj.timelineSettings.bottomTier.unit = "Day";
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("None");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(4);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("2/2/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("2/6/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(1);
                done();
            }
            ganttObj.refresh();

        });
        it('Day in both tier', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Day";
            ganttObj.timelineSettings.bottomTier.unit = "Day";
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        it('Timeline in Day-Minutes Mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Day";
            ganttObj.timelineSettings.bottomTier.unit = "Minutes";
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Day");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Minutes");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(24);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("m");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        // Hour
        it('Hour in toptier only', (done: Function) => {
            ganttObj.projectStartDate = "02/02/2018";
            ganttObj.projectEndDate = "02/05/2018";
            ganttObj.timelineSettings.topTier.unit = "Hour";
            ganttObj.timelineSettings.bottomTier.unit = "None";
            ganttObj.timelineSettings.bottomTier.count = 24;
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Hour");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("None");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("H");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("2/2/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineEndDate, 'M/d/yyyy')).toBe("2/5/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(1);
                done();
            }
            ganttObj.refresh();
        }, 1000);
        it('Hour in both mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Hour";
            ganttObj.timelineSettings.bottomTier.unit = "Hour";
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Hour");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Hour");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("H");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("H");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        });
        //Minutes
        it('Minute in both mode', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Minutes";
            ganttObj.timelineSettings.topTier.unit = "Minutes";
            ganttObj.timelineSettings.bottomTier.count = 100000;
            ganttObj.dataBound = () => {
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Minutes");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Minutes");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.count).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.format).toBe("m");
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.format).toBe("m");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineStartDate, 'M/d/yyyy')).toBe("2/2/2018");
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineEndDate, 'M/d/yyyy')).toBe("2/5/2018");
                expect(ganttObj.element.querySelector("." + cls.timelineHeaderContainer).childElementCount).toBe(2);
                done();
            }
            ganttObj.refresh();
        }, 6000);
        it('Custom Formatting the timeline', () => {
            ganttObj.timelineSettings.timelineViewMode = "Month";
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.unit = "Month";
            ganttObj.timelineSettings.topTier.count = 3;
            ganttObj.timelineSettings.topTier.formatter = (date: Date) => {
                let month: number = date.getMonth();
                if (month >= 0 && month <= 2) {
                    return 'Q1';
                }
                else if (month >= 3 && month <= 5) {
                    return 'Q2';
                }
                else if (month >= 6 && month <= 8) {
                    return 'Q3';
                }
                else {
                    return 'Q4';
                }
            };
            ganttObj.refresh();
            let element: HTMLElement = ganttObj.element.querySelector('#' + ganttObj.element.id + 'GanttChart > div.e-timeline-header-container > table:nth-child(1) > thead > tr > th.e-timeline-top-header-cell > div') as HTMLElement;
            expect(element.textContent).toBe("Q1");
        }, 3000);

        it('Zooming action with Top tier only', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.unit = "None";
            ganttObj.timelineSettings.bottomTier.format = '';
            ganttObj.timelineSettings.topTier.format = 'M';
            ganttObj.dataBound = () => {
                ganttObj.zoomIn();
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("None");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.timelineUnitSize).toBe(66);
                expect(ganttObj.currentZoomingLevel.level).toBe(12);
                done();
            }
            ganttObj.refresh();
        }, 3000);

        it('Zooming action with Bottom tier only', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "None";
            ganttObj.timelineSettings.bottomTier.unit = "Month";
            ganttObj.timelineSettings.bottomTier.format = 'M';
            ganttObj.timelineSettings.topTier.format = '';
            ganttObj.dataBound = () => {
                ganttObj.zoomIn();
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Week");
                expect(ganttObj.timelineModule.customTimelineSettings.topTier.unit).toBe("None");
                expect(ganttObj.timelineModule.customTimelineSettings.timelineUnitSize).toBe(33);
                expect(ganttObj.currentZoomingLevel.level).toBe(8);
                done();
            }
            ganttObj.refresh();
        }, 3000);

        it('check zoomout button with last zoomout level', (done: Function) => {
            ganttObj.projectEndDate = new Date('03/24/2028');
            ganttObj.timelineSettings.topTier.unit = "Year";
            ganttObj.timelineSettings.topTier.count = 5;
            ganttObj.timelineSettings.bottomTier.count = 10;
            ganttObj.timelineSettings.bottomTier.unit = "Year";
            ganttObj.timelineSettings.bottomTier.format = 'yyyy';
            ganttObj.timelineSettings.topTier.format = 'yyyy';
            ganttObj.dataBound = function () {
                ganttObj.zoomOut();
                expect(ganttObj.currentZoomingLevel.level).toBe(0);
                done();
            }
            ganttObj.refresh();
        }, 3000);

        it('check zoomin button with last zoomin level', (done: Function) => {
            ganttObj.projectEndDate = new Date('02/24/2018');
            ganttObj.timelineSettings.topTier.unit = "Hour";
            ganttObj.timelineSettings.topTier.count = 1;
            ganttObj.timelineSettings.bottomTier.count = 15;
            ganttObj.timelineSettings.bottomTier.unit = "Minutes";
            ganttObj.dataBound = function () {
                ganttObj.zoomIn();
                expect(ganttObj.currentZoomingLevel.level).toBe(24);
                done();
            }
            ganttObj.refresh();
        }, 3000);

        it('check zooming level collections length', (done: Function) => {
            ganttObj.projectEndDate = new Date('02/24/2018');
            ganttObj.timelineSettings.topTier.unit = "Hour";
            ganttObj.timelineSettings.topTier.count = 1;
            ganttObj.timelineSettings.bottomTier.count = 15;
            ganttObj.timelineSettings.bottomTier.unit = "Minutes";
            ganttObj.dataBound = function () {
                ganttObj.zoomingLevels = [];
                ganttObj.zoomIn();
                expect(ganttObj.currentZoomingLevel.level).toBe(24);
                expect(ganttObj.zoomingLevels.length).toBeGreaterThanOrEqual(0);
                done();
            }
            ganttObj.refresh();
        }, 3000);

        it('zoomtofit action when Gantt chart width is zero', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Year";
            ganttObj.timelineSettings.topTier.count = 1;
            ganttObj.timelineSettings.bottomTier.count = 1;
            ganttObj.timelineSettings.bottomTier.unit = "Year";
            ganttObj.splitterSettings.position = '100%';
            ganttObj.dataBound = function () {
                ganttObj.fitToProject();
                expect(ganttObj.currentZoomingLevel.level).toBe(2);
                done();
            }
            ganttObj.refresh();
        }, 3000);

        it('check zooming actions with custom zooming levels', (done: Function) => {
            ganttObj.zoomingLevels = [{
                topTier: { unit: 'Day', format: 'ddd MMM d', count: 1 },
                bottomTier: { unit: 'Hour', format: 'hh a', count: 12 }, timelineUnitSize: 99, level: 0,
                timelineViewMode: 'Day', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Hour', format: 'ddd MMM d, h a', count: 1 },
                bottomTier: { unit: 'Minutes', format: 'mm', count: 30 }, timelineUnitSize: 66, level: 1,
                timelineViewMode: 'Hour', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            }]
            ganttObj.zoomIn();
            expect(ganttObj.currentZoomingLevel.level).toBe(1);
            expect(ganttObj.currentZoomingLevel.bottomTier.unit).toBe('Minutes');
            done();
            ganttObj.zoomingLevels = ganttObj.getZoomingLevels();
            ganttObj.refresh();
        }, 3000);

        it('check zooming actions with custom zooming levels', (done: Function) => {
            ganttObj.timelineSettings.topTier.unit = "Month";
            ganttObj.timelineSettings.topTier.count = 1;
            ganttObj.timelineSettings.bottomTier.count = 1;
            ganttObj.timelineSettings.bottomTier.unit = "Week";
            ganttObj.dataBound = function () {
                ganttObj.zoomingLevels = [{
                    topTier: { unit: 'Day', format: 'ddd MMM d', count: 1 },
                    bottomTier: { unit: 'Hour', format: 'hh a', count: 12 }, timelineUnitSize: 99, level: 0,
                    timelineViewMode: 'Day', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
                },
                {
                    topTier: { unit: 'Hour', format: 'ddd MMM d, h a', count: 1 },
                    bottomTier: { unit: 'Minutes', format: 'mm', count: 30 }, timelineUnitSize: 66, level: 1,
                    timelineViewMode: 'Hour', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
                }];
                ganttObj.zoomIn();
                expect(ganttObj.currentZoomingLevel.level).toBe(1);
                expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe("Minutes");
                done();
            }
            ganttObj.refresh();
        }, 3000);

        it('check the current zooming level when the bottom tire count in between the zooming levels', (done: Function) => {
            ganttObj.zoomingLevels = ganttObj.getZoomingLevels();
            ganttObj.timelineSettings.topTier.unit = "Year";
            ganttObj.timelineSettings.topTier.count = 1;
            ganttObj.timelineSettings.bottomTier.count = 4;
            ganttObj.timelineSettings.bottomTier.unit = "Month";
            ganttObj.dataBound = function () {
                ganttObj.zoomOut();
                expect(ganttObj.currentZoomingLevel.level).toBe(7);
                done();
            }
            ganttObj.refresh();
        }, 3000);

        it('Zoom to fit when perDay width below the last zoomin level width', (done: Function) => {
            ganttObj.dataSource = zoomData;
            ganttObj.splitterSettings.position = '0%';
            ganttObj.dataBound = () => {
                let zoomToFit: HTMLElement = ganttObj.element.querySelector('#' + ganttObj.element.id + '_zoomtofit') as HTMLElement;
                triggerMouseEvent(zoomToFit, 'click');
                expect(ganttObj.currentZoomingLevel.level).toBe(24);
                done();
            }
            ganttObj.refresh();
        }, 3000);

        it('Zoom to fit when perDay width exceed the last zoomout level width', (done: Function) => {
            ganttObj.dataSource = zoomData1;
            ganttObj.splitterSettings.position = '99%';
            ganttObj.dataBound = () => {
                ganttObj.fitToProject();
                expect(ganttObj.currentZoomingLevel.level).toBe(0);
                ganttObj.zoomingLevels[3].bottomTier.count = 13;
                ganttObj.zoomIn();
                done();
            }
            ganttObj.refresh();
        }, 3000);

        it('To check disable state of zoomin icon when mismatching the count value', (done: Function) => {
            ganttObj.dataSource = defaultGanttData;
            ganttObj.splitterSettings.position = '50%';
            ganttObj.dataBound = () => {
                ganttObj.zoomingLevels[1].bottomTier.count=14;
                ganttObj.zoomIn();
                expect(ganttObj.currentZoomingLevel.level).toBe(7);
                expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("2/24/2018");
                ganttObj.fitToProject();
                done();
            }
            ganttObj.refresh();
        }, 3000);

        it('Aria-label testing', (done: Function) => {
            ganttObj.projectStartDate = "01/28/2018";
            ganttObj.projectEndDate = "03/24/2018";
            ganttObj.timelineSettings.timelineViewMode = "Week";
            ganttObj.timelineSettings.topTier.unit = "None";
            ganttObj.timelineSettings.bottomTier.unit = "None";
            ganttObj.timelineSettings.topTier.count = 1;
            ganttObj.timelineSettings.bottomTier.count = 1;
            ganttObj.timelineSettings.topTier.formatter = null;                     
            ganttObj.dataBound = () => {
                expect(ganttObj.element.querySelector('#' + ganttObj.element.id + 'GanttChart > div.e-timeline-header-container > table:nth-child(1) > thead > tr > th').getAttribute('aria-label').indexOf('Timeline cell 1/27/2018')> -1).toBeTruthy();
                expect(ganttObj.element.querySelector('#' + ganttObj.element.id + 'GanttChart > div.e-timeline-header-container > table:nth-child(2) > thead > tr > th:nth-child(3)').getAttribute('aria-label').indexOf('Timeline cell 1/29/2018')> -1).toBeTruthy();
                done();
            }
            ganttObj.refresh();
        });
        it('Checking bottom tier weekStartDay after zooming action', () => {
            ganttObj.timelineSettings.weekStartDay=1;
            ganttObj.zoomIn();
            ganttObj.actionComplete = (args: any):void => {
                if(args.requestType === "ZoomIn"){
                expect(ganttObj.timelineSettings.weekStartDay).toBe(1);
                }
            }
        });
    });
    describe('Project End Date', () => {
        let ganttObj: Gantt;
        beforeAll((done: Function) => {
            ganttObj = createGantt(
                {
                    dataSource: defaultGanttData,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'Children',
                },
                splitterSettings: {
                    position: '30%'
                },
                toolbar: ['ZoomIn', 'ZoomOut', 'ZoomToFit', 'PrevTimeSpan', 'NextTimeSpan'],
                projectStartDate: new Date('01/28/2018'),
                projectEndDate: new Date('02/07/2018')
                }, done);
        });
        it('Render project end date as in sample', () => {
            expect(ganttObj.getFormatedDate(ganttObj.timelineModule.timelineRoundOffEndDate, 'M/d/yyyy')).toBe("2/7/2018");
        });  
        afterAll(() => {
            destroyGantt(ganttObj);
        });
        beforeEach((done: Function) => {
            setTimeout(done, 2000);
        });
    });
describe('Render top Tier alone in Zoom to fit', () => {
        let ganttObj: Gantt;
        let customZoomingLevels: any[] = [
            {
              level: 0,
              timelineUnitSize: 99,
              timelineViewMode: 'Year',
              bottomTier: {
                unit: 'Month',
                count: 3,
                formatter: (date: Date) => {
                  const month = date.getMonth();
                  if (month >= 0 && month <= 2) {
                    return 'CQ1';
                  } else if (month >= 3 && month <= 5) {
                    return 'CQ2';
                  } else if (month >= 6 && month <= 3) {
                    return 'CQ3';
                  } else {
                    return 'CQ4';
                  }
                },
              },
              topTier: {
                unit: 'Year',
                count: 1,
                formatter: (date: Date) => {
                  return date.getFullYear().toString();
                },
              },
            },
            {
              level: 1,
              timelineUnitSize: 99,
              timelineViewMode: 'Year',
              bottomTier: {
                unit: 'Month',
                count: 1,
                formatter: (date: Date) => {
                  // return date.toDateString().match(this.datePattern)[2];
                },
              },
              topTier: {
                unit: 'Month',
                count: 3,
                formatter: (date: Date) => {
                  const month = date.getMonth();
                  const year = date.getFullYear();
                  if (month >= 0 && month <= 2) {
                    return 'CQ1 ' + year;
                  } else if (month >= 3 && month <= 5) {
                    return 'CQ2 ' + year;
                  } else if (month >= 6 && month <= 3) {
                    return 'CQ3 ' + year;
                  } else {
                    return 'CQ4 ' + year;
                  }
                },
              },
            },
            {
              level: 2,
              timelineUnitSize: 99,
              timelineViewMode: 'Month',
              bottomTier: {
                unit: 'Week',
                count: 1,
                formatter: (date: Date) => {
                  //const match = date.toDateString().match(this.datePattern);
                  // return `${match[2]} ${match[3]}`;
                },
              },
              topTier: {
                unit: 'Month',
                count: 1,
                formatter: (date: Date) => {
                  // const match = date.toDateString().match(this.datePattern);
                  //return `${match[2]}, ${match[4]}`;
                },
              },
            },
            {
              level: 3,
              topTier: {
                unit: 'Week',
                count: 1,
                formatter: (date: Date) => {
                  // const match = date.toDateString().match(this.datePattern);
                  // return `${match[2]} ${match[3]}, ${match[4]}`;
                },
              },
              bottomTier: {
                unit: 'Day',
                count: 1,
                formatter: (date: Date) => {
                  // const match = date.toDateString().match(this.datePattern);
                  //  return `${match[1]}`;
                },
              },
              timelineUnitSize: 99,
              timelineViewMode: 'Week',
              weekStartDay: 0,
              updateTimescaleView: true,
            },
          ];
          let zoomingData: Object[] = [
            {
                TaskID: 1,
                TaskName: 'Product concept',
                StartDate: new Date('04/02/2019'),
                EndDate: new Date('04/21/2019'),
                subtasks: [
                    { TaskID: 2, TaskName: 'Defining the product and its usage', StartDate: new Date('04/02/2019'), Duration: 3, Progress: 30 },
                    { TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3 },
                    {
                        TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 2,
                        Predecessor: '2', Progress: 30
                    },
                ]
            },
            {
                TaskID: 5, TaskName: 'Concept approval', StartDate: new Date('04/02/2019'), Duration: 0, Predecessor: '3,4',
                Indicators: [
                    {
                        'date': new Date('04/10/2019'),
                        'name': '#briefing',
                        'title': 'Product concept breifing',
                    }
                ]
            },
            {
                TaskID: 6,
                TaskName: 'Market research',
                StartDate: new Date('04/02/2019'),
                EndDate: new Date('04/21/2019'),
                subtasks: [
                    {
                        TaskID: 7,
                        TaskName: 'Demand analysis',
                        StartDate: new Date('04/04/2019'),
                        EndDate: new Date('04/21/2019'),
                        subtasks: [
                            {
                                TaskID: 8, TaskName: 'Customer strength', StartDate: new Date('04/04/2019'), Duration: 4,
                                Predecessor: '5', Progress: 30
                            },
                            { TaskID: 9, TaskName: 'Market opportunity analysis', StartDate: new Date('04/04/2019'), Duration: 4, Predecessor: '5' }
                        ]
                    },
                    {
                        TaskID: 10, TaskName: 'Competitor analysis', StartDate: new Date('04/04/2019'), Duration: 4,
                        Predecessor: '7, 8', Progress: 30
                    },
                    { TaskID: 11, TaskName: 'Product strength analsysis', StartDate: new Date('04/04/2019'), Duration: 4, Predecessor: '9' },
                    {
                        TaskID: 12, TaskName: 'Research complete', StartDate: new Date('04/04/2019'), Duration: 1, Predecessor: '10',
                        Indicators: [
                            {
                                'date': new Date('04/20/2019'),
                                'name': '#meeting',
                                'title': '1st board of directors meeting',
                            }
                        ]
                    }
                ]
            }
        ]
        beforeAll((done: Function) => {
            ganttObj = createGantt(
                {
                    dataSource: zoomingData,
                    taskFields: {
                        id: 'TaskID',
                        name: 'TaskName',
                        startDate: 'StartDate',
                        endDate: 'EndDate',
                        duration: 'Duration',
                        progress: 'Progress',
                        dependency: 'Predecessor',
                        child: 'subtasks',
                    },
                    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 
                    'PrevTimeSpan', 'NextTimeSpan','ExcelExport', 'CsvExport', 'PdfExport'],
                    allowResizing: true,
                    readOnly: false,
                    taskbarHeight: 20,
                    rowHeight: 40,
                    height: '550px',
                    dataBound(): void {
                        ganttObj.zoomingLevels = customZoomingLevels;
                    },
                    allowUnscheduledTasks: true,
                    projectStartDate: new Date('03/25/2019'),
                    projectEndDate: new Date('07/06/2019')
                }, done);
        });
        it('perform zoomToFit', () => {
            ganttObj.actionBegin= (args) => {
                let a = extend([], [], customZoomingLevels, true);
                if ((args.requestType == 'beforeZoomToProject')) {
                    ganttObj.timelineModule.customTimelineSettings = a[0];
                    ganttObj.timelineModule.customTimelineSettings.bottomTier.unit = 'None';
                  }
            }
            ganttObj.actionComplete= (args) => {
                if (args.requestType == 'AfterZoomToProject') {
                   expect(ganttObj.timelineModule.customTimelineSettings.bottomTier.unit).toBe('None');
                }
            }
            ganttObj.dataBind();
            ganttObj.fitToProject();
        });  
        afterAll(() => {
            destroyGantt(ganttObj);
        });
    });
    describe('Check Zooming levels API', () => {
        let ganttObj: Gantt;
        let customZoomingLevels: any[] = [
            {
              level: 0,
              timelineUnitSize: 99,
              timelineViewMode: 'Year',
              bottomTier: {
                unit: 'Month',
                count: 3,
                formatter: (date: Date) => {
                  const month = date.getMonth();
                  if (month >= 0 && month <= 2) {
                    return 'CQ1';
                  } else if (month >= 3 && month <= 5) {
                    return 'CQ2';
                  } else if (month >= 6 && month <= 3) {
                    return 'CQ3';
                  } else {
                    return 'CQ4';
                  }
                },
              },
              topTier: {
                unit: 'Year',
                count: 1,
                formatter: (date: Date) => {
                  return date.getFullYear().toString();
                },
              },
            },
            {
              level: 1,
              timelineUnitSize: 99,
              timelineViewMode: 'Year',
              bottomTier: {
                unit: 'Month',
                count: 1,
                formatter: (date: Date) => {
                  // return date.toDateString().match(this.datePattern)[2];
                },
              },
              topTier: {
                unit: 'Month',
                count: 3,
                formatter: (date: Date) => {
                  const month = date.getMonth();
                  const year = date.getFullYear();
                  if (month >= 0 && month <= 2) {
                    return 'CQ1 ' + year;
                  } else if (month >= 3 && month <= 5) {
                    return 'CQ2 ' + year;
                  } else if (month >= 6 && month <= 3) {
                    return 'CQ3 ' + year;
                  } else {
                    return 'CQ4 ' + year;
                  }
                },
              },
            }
          ];
        beforeAll((done: Function) => {
            ganttObj = createGantt(
                {
                    dataSource: defaultGanttData,
                    zoomingLevels: customZoomingLevels,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'Children',
                },
                splitterSettings: {
                    position: '30%'
                },
                toolbar: ['ZoomIn', 'ZoomOut', 'ZoomToFit', 'PrevTimeSpan', 'NextTimeSpan'],
                projectStartDate: new Date('01/28/2018'),
                projectEndDate: new Date('02/07/2018')
                }, done);
        });
        it('Zooming levels API', () => {
            expect(ganttObj.zoomingLevels.length).toBe(2);
        });  
        afterAll(() => {
            destroyGantt(ganttObj);
        });
    });
});
