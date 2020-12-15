import { resolve } from 'dns';
import { Direction, isVertical, isHorizontal } from '../type/direction';
import { randNum, getRandDirection } from '../utils/public';

interface SnakeCell {
  direction: Direction, // 方向
  x: number, // x坐标 
  y: number, // y坐标
}

interface SpaceRange {
  xRange: number[], // x轴范围
  yRange: number[] // y轴范围
}

export class Snake {
  body: SnakeCell[];
  constructor() {
    this.body = [];
  }

  /**
   * 移动
   */
  move() {
    if (this.body.length === 1) {
      this.body[0]
    }
  }

  /**
   * 
   */
  eat() {

  }

  /**
   * 生成一条蛇
   * @param {Array} filedSize 场地规格
   * @param {Number} length 蛇初始长度
   * @returns {Promise} 结果
   */
  create(filedSize: [number, number], length: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const fieldX = filedSize[0];
      const fieldY = filedSize[1];
      // 蛇头初始化时离墙边的最短距离，防止开局撞墙
      const safeDistance: number = 2;
      // 随机一个初始方向
      const direction: Direction = getRandDirection();
      // 长度检测
      if (!isSpaceEnough(length + safeDistance, isHorizontal(direction) ? fieldX : fieldY)) {
        reject();
      }
      // x轴和y轴可随机范围
      const range = getSpaceRange(direction, filedSize, safeDistance);
      // 生成蛇
      const startX = randNum.apply(null, range.xRange);
      const startY = randNum.apply(null, range.yRange);
      this.body = createBody(direction, [startX, startY], length);
      resolve();
    });
  }
}

/**
 * 判断空间是否足够
 * @param {Number} object 物体长度
 * @param {Number} space 空间长度
 * @returns {Boolean}
 */
function isSpaceEnough(object: number, space: number): boolean {
  return space >= object;
}

/**
 * 获取x轴和y轴可随机范围
 * @param {Direction} direction 蛇头方向
 * @param {Array} filedSize 场地规格
 * @param {Number} safeDistance 蛇头初始化时离墙边的最短距离，防止开局撞墙
 * @returns {SpaceRange}
 */
function getSpaceRange(direction: Direction, filedSize: [number, number], safeDistance: number): SpaceRange {
  const fieldX = filedSize[0];
  const fieldY = filedSize[1];
  let range = {
    xRange: [],
    yRange: [],
  };
  switch (direction) {
    case 'up': {
      range = {
        xRange: [0, fieldX - 1],
        yRange: [length - 1, fieldY - 1 - safeDistance],
      }
    }
      break;
    case 'right': {
      range = {
        xRange: [0, fieldX - 1 - safeDistance],
        yRange: [0, fieldY - 1],
      }
    }
      break;
    case 'down': {
      range = {
        xRange: [0, fieldX - 1],
        yRange: [safeDistance - 1, fieldY - 1 - length],
      }
    }
      break;
    case 'left': {
      range = {
        xRange: [safeDistance - 1, fieldX - 1 - length],
        yRange: [0, fieldY - 1],
      }
    }
      break;
  }
  return range;
}

/**
 * 生成蛇的所有格子信息
 * @param {Direction} direction 起始方向
 * @param {Array} start 初始点坐标
 * @param {Number} length 蛇长度
 * @returns {Array<SnakeCell>}
 */
function createBody(direction: Direction, start: number[], length: number): SnakeCell[] {
  const startX = start[0];
  const startY = start[1];
  let snake: SnakeCell[] = [];
  for (let i = 0; i < length; i++) {
    if (isHorizontal(direction)) {
      snake.push({
        direction,
        x: direction === 'right' ? startX - i : startX + i,
        y: startY
      });
    } else {
      snake.push({
        direction,
        x: startX,
        y: direction === 'up' ? startY - i : startY + i,
      });
    }
  }
  return snake;
}

/**
 * 单个单元格移动
 * @param {SnakeCell} cell 格信息
 * @param {Direction} direction 方向
 * @returns {SnakeCell}
 */
function moveSingle(cell: SnakeCell, direction: Direction): SnakeCell {
  switch (direction) {
    case 'up': {
      cell.y ++;
    }
    break;
    case 'right': {
      cell.x ++;
    }
    break;
    case 'down': {
      cell.y --;
    }
    break;
    case 'left': {
      cell.y --;
    }
    break;
  }
  return cell;
}