/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { Schedule } from '../base/schedule';
import { EventFieldsMapping } from '../base/interface';
import { getRecurrenceStringFromDate } from '../../recurrence-editor/date-generator';

/**
 * ICalendar Import Module
 */

export class ICalendarImport {
    private parent: Schedule;
    private allDay: boolean = false;
    constructor(parent: Schedule) {
        this.parent = parent;
    }

    public initializeCalendarImport(fileContent: Blob | string): void {
        if (fileContent && fileContent instanceof Blob) {
            const fileReader: FileReader = new FileReader();
            fileReader.onload = () => {
                const iCalString: string = fileReader.result as string;
                this.iCalendarParser(iCalString);
            };
            fileReader.readAsText(fileContent as Blob, 'UTF-8');
        } else if (fileContent && typeof fileContent === 'string') {
            this.iCalendarParser(fileContent);
        }
    }

    private iCalendarParser(iCalString: string): void {
        const fields: EventFieldsMapping = this.parent.eventFields;
        const events: Record<string, any>[] = [];
        const uId: string = 'UID';
        const calArray: string[] = iCalString.replace(new RegExp('\\r', 'g'), '').split('\n');
        let isEvent: boolean = false;
        let curEvent: Record<string, any>;
        // eslint-disable-next-line prefer-const
        let id: number | string = this.parent.eventBase.getEventMaxID();
        let count: number = 0;
        calArray.forEach((element: string) => {
            let index: number;
            let type: string;
            let value: string;
            if (!isEvent && element === 'BEGIN:VEVENT') {
                isEvent = true;
                curEvent = {};
            }
            if (isEvent && element === 'END:VEVENT') {
                isEvent = false;
                events.push(curEvent);
                curEvent = null;
            }
            if (isEvent) {
                index = element.indexOf(':');
                type = element.substr(0, index).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                value = element.substr(index + 1, element.length - (index + 1)).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                if (element.indexOf('SUMMARY') !== -1) {
                    type = 'SUMMARY';
                }
                if (element.indexOf('DTSTART') !== -1) {
                    curEvent[fields.startTime] = this.dateParsing(element);
                    curEvent[fields.isAllDay] = this.allDay;
                    this.allDay = false;
                } else if (element.indexOf('DTEND') !== -1) {
                    curEvent[fields.endTime] = this.dateParsing(element);
                } else if (element.indexOf('EXDATE') !== -1) {
                    value = getRecurrenceStringFromDate(this.dateParsing(element));
                    curEvent[fields.recurrenceException] = (isNullOrUndefined(curEvent[fields.recurrenceException])) ?
                        value : curEvent[fields.recurrenceException] + ',' + value;
                } else if (element.indexOf('RECURRENCE-ID') !== -1) {
                    value = getRecurrenceStringFromDate(this.dateParsing(element));
                    curEvent[fields.recurrenceException] = value;
                    curEvent[fields.recurrenceID] = value;
                } else {
                    switch (type) {
                    case 'BEGIN':
                        break;
                    case 'UID':
                        curEvent[`${uId}`] = value;
                        if (typeof(id) == 'number') {
                            curEvent[fields.id] = parseInt(value, 10);
                            if (isNaN(curEvent[fields.id])) {
                                curEvent[fields.id] = id + count;
                                count++;
                            }
                        } else {
                            curEvent[fields.id] = value;
                        }
                        break;
                    case 'SUMMARY':
                        curEvent[fields.subject] = value;
                        break;
                    case 'LOCATION':
                        curEvent[fields.location] = value;
                        break;
                    case 'DESCRIPTION':
                        curEvent[fields.description] = value;
                        break;
                    case 'ISREADONLY':
                        curEvent[fields.isReadonly] = (value.indexOf('true') > -1);
                        break;
                    case 'RRULE':
                        curEvent[fields.recurrenceRule] = value;
                        break;
                    default:
                        if (this.parent.resourceCollection.length > 0) {
                            const resData: Record<string, any>[] =
                                this.parent.resourceCollection.filter((data: Record<string, any>) => data.field === type);
                            curEvent[`${type}`] = (resData.length > 0 && (typeof (resData[0].dataSource[0][resData[0].idField]) == 'number')) ? parseInt(value, 10) : value;
                        } else {
                            curEvent[`${type}`] = value;
                        }
                    }
                }
            }
        });
        const app: Record<string, any>[] = <Record<string, any>[]>extend([], events, null, true);
        this.parent.addEvent(this.processOccurrence(app, id));
    }

    private processOccurrence(app: Record<string, any>[], maxId: number | string): Record<string, any>[] {
        const appoint: Record<string, any>[] = [];
        const uId: string = 'UID';
        const fields: EventFieldsMapping = this.parent.eventFields;
        const appointmentIds: number[] = [];
        this.parent.eventsData.forEach((eventObj: Record<string, any>) => {
            appointmentIds.push(eventObj[fields.id]);
        });
        app.forEach((eventObj: Record<string, any>) => {
            let parentObj: Record<string, any>;
            let id: number | string;
            // eslint-disable-next-line no-prototype-builtins
            if (!eventObj.hasOwnProperty(fields.recurrenceID)) {
                parentObj = eventObj;
                id = eventObj[fields.id] as string;
            }
            if (appointmentIds.indexOf(eventObj[fields.id]) < 0) {
                const data: Record<string, any>[] = app.filter((data: Record<string, any>) => data.UID === eventObj[`${uId}`]);
                if (data.length > 1 && isNullOrUndefined(eventObj[fields.recurrenceID])) {
                    id = typeof(maxId) === 'number' ? maxId++ : id;
                    for (let i: number = 0; i < data.length; i++) {
                        // eslint-disable-next-line no-prototype-builtins
                        if (data[parseInt(i.toString(), 10)].hasOwnProperty(fields.recurrenceID)) {
                            const exdate: string = data[parseInt(i.toString(), 10)][fields.recurrenceID] as string;
                            data[parseInt(i.toString(), 10)][fields.id] = typeof(maxId) === 'number' ? maxId++ : this.parent.eventBase.generateGuid();
                            data[parseInt(i.toString(), 10)][fields.recurrenceID] = id;
                            data[parseInt(i.toString(), 10)][fields.recurrenceException] = null;
                            parentObj[fields.recurrenceException] =
                                this.getExcludeDateString(parentObj[fields.recurrenceException], exdate);
                            delete data[parseInt(i.toString(), 10)][`${uId}`];
                            appoint.push(data[parseInt(i.toString(), 10)]);
                        }
                    }
                    delete parentObj[`${uId}`];
                    parentObj[fields.id] = id;
                    appoint.push(parentObj);
                    // eslint-disable-next-line no-prototype-builtins
                } else if (!eventObj.hasOwnProperty(fields.recurrenceID)) {
                    delete eventObj[`${uId}`];
                    eventObj[fields.id] = typeof(maxId) === 'number' ? maxId++ : id;
                    appoint.push(eventObj);
                }
            }
        });
        return appoint;
    }

    private getExcludeDateString(parentException: string, occurrenceException: string): string {
        if (isNullOrUndefined(parentException)) {
            return occurrenceException;
        } else if (isNullOrUndefined(occurrenceException)) {
            return parentException;
        }
        const parentExDate: string[] = parentException.split(',').map((x: string) => x.split('T')[0]);
        const childExDate: string[] = occurrenceException.split(',').map((x: string) => x.split('T')[0]);
        const exDate: string[] = parentExDate.filter((x: string) => childExDate.indexOf(x) > -1);
        if (exDate.length > 0) {
            return parentException;
        }
        return parentException + ',' + occurrenceException;
    }

    private getDateString(value: string): string {
        value = value || '';
        // eslint-disable-next-line no-useless-escape
        return (value.replace(/\\\,/g, ',').replace(/\\\;/g, ';').replace(/\\[nN]/g, '\n').replace(/\\\\/g, '\\'));
    }

    private dateParsing(element: string): Date {
        const split: string[] = element.split(':');
        const value: string = split[split.length - 1];
        let newDate: Date = new Date(this.getDateString(value));
        if (element && (element.indexOf('VALUE=DATE') > -1 || element.indexOf('RECURRENCE-ID;TZID') > -1)) {
            const data: string[] = /^(\d{4})(\d{2})(\d{2})$/.exec(value);
            if (data !== null) {
                newDate = new Date(parseInt(data[1], 10), parseInt(data[2], 10) - 1, parseInt(data[3], 10));
            }
            if (element.indexOf('DTSTART') > -1) {
                this.allDay = true;
            }
        }
        const data: string[] = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/.exec(value);
        if (data !== null) {
            if (data[7] === 'Z') {
                newDate = new Date(Date.UTC(
                    parseInt(data[1], 10),
                    parseInt(data[2], 10) - 1,
                    parseInt(data[3], 10),
                    parseInt(data[4], 10),
                    parseInt(data[5], 10),
                    parseInt(data[6], 10)
                ));
            } else {
                newDate = new Date(
                    parseInt(data[1], 10),
                    parseInt(data[2], 10) - 1,
                    parseInt(data[3], 10),
                    parseInt(data[4], 10),
                    parseInt(data[5], 10),
                    parseInt(data[6], 10)
                );
            }
        }
        return newDate;
    }

    protected getModuleName(): string {
        return 'iCalendarImport';
    }

    public destroy(): void {
        if (!this.parent || this.parent && this.parent.isDestroyed) { return; }
    }

}
