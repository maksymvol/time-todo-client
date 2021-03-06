import {Injectable} from '@angular/core';
import {Task} from './Task';
import {ProjectsService} from './projects.service';
import {Project} from './Project';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  static dayHours = 12;
  static tags = ['everyDay', 'workingDays', 'weekendDays', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  constructor() {
  }

  static getCurrentDate() {
    return new Date();
  }

  static getEndDate(tasks: any) {
    let endDate = TimeService.getCurrentDate();

    for (const task of tasks) {
      const date = new Date(task.startDate);
      if (date.getTime() > endDate.getTime()) {
        endDate = date;
      }
    }
    return endDate;
  }

  static getTimeString(date, incrementMonth: boolean) {
    let result = '';
    result += date.getDate() + '-';
    if (incrementMonth) {
      result += date.getMonth() + 1;
    } else {
      result += date.getMonth();
    }
    result += '-' + date.getFullYear();
    return result;
  }

  static stringToDate(s: string) {
    const date = s.split('/');
    return new Date(+date[2], +date[1], +date[0]);
  }

  static getDatesFromTo(start, end) {
    const startDate = new Date(start);
    const stopDate = TimeService.addDays(new Date(end), 1);

    const dateArray = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = TimeService.addDays(currentDate, 1);
    }
    return dateArray;
  }

  static addDays(date: Date, days: number) {
    return new Date(date.setDate(date.getDate() + days));
  }

  static getMonthDays(currentDate: Date) {
    const result = [];
    const daysAmount = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysAmount; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      result.push(date);
    }
    return result;
  }

  static getDayInfo(day: Date, tasks: Task[], projects: Project[]) {
    const result = {tasks: [], taskAmount: 0, projects: 0, hours: 0};
    if (!tasks) {
      return result;
    }

    for (let task of tasks) {
      if (TimeService.isInDay(day, task)) {
        result.tasks.push(task);
      }
    }
    result.tasks = ProjectsService.getTasksByPriority(result.tasks, projects);

    let time = TimeService.dayHours;
    for (const task of result.tasks) {
      const taskDuration = TimeService.getDurationInHours(task.duration);

      if (time >= taskDuration) {
        time -= taskDuration;
        result.taskAmount++;
        result.hours += TimeService.getDurationInHours(task.duration);
        task.isFitInDay = true;
      } else {
        task.isFitInDay = false;
      }
    }
    result.projects = TimeService.getProjectsAmount(result.tasks);
    return result;
  }

  static getDurationInHours(duration: string) {
    const num = +duration.split('/')[0];
    const t = duration.split('/')[1];
    if (t === 'm') {
      return num * 0.01;
    }
    if (t === 'h') {
      return num;
    }
    if (t === 'd') {
      return num * 24;
    }
  }

  private static isInDay(day: Date, task: Task) {
    const taskStart = new Date(task.startDate);
    if (taskStart >= day) {
      return false;
    }
    let result = false;

    for (const tag of task.tags) {
      if (tag.tag === this.tags[0]) {
        return true;
      }
      if (tag.tag === this.tags[1]) {
        if (day.getDay() >= 1 && day.getDay() <= 5) {
          result = true;
        }
      }
      if (tag.tag === this.tags[2]) {
        if (day.getDay() === 0 || day.getDay() === 6) {
          result = true;
        }
      }
      if (tag.tag === this.tags[3]) {
        if (day.getDay() === 1) {
          result = true;
        }
      }
      if (tag.tag === this.tags[4]) {
        if (day.getDay() === 2) {
          result = true;
        }
      }
      if (tag.tag === this.tags[5]) {
        if (day.getDay() === 3) {
          result = true;
        }
      }
      if (tag.tag === this.tags[6]) {
        if (day.getDay() === 4) {
          result = true;
        }
      }
      if (tag.tag === this.tags[7]) {
        if (day.getDay() === 5) {
          result = true;
        }
      }
      if (tag.tag === this.tags[8]) {
        if (day.getDay() === 6) {
          result = true;
        }
      }
      if (tag.tag === this.tags[9]) {
        if (day.getDay() === 0) {
          result = true;
        }
      }
    }
    return result;
  }

  private static getProjectsAmount(tasks: Task[]) {
    const result = [];
    for (let task of tasks) {
      if (task.isFitInDay && result.findIndex(id => task.projectId === id) === -1) {
        result.push(task.projectId);
      }
    }
    return result.length;
  }

  static isEmptyDay(day: Date, tasks: Task[]) {
    for (const task of tasks) {
      if (TimeService.isInDay(day, task)) {
        return false;
      }
    }

    return true;
  }
}
