import { Direction } from '../type';
import { getRandDirection } from '../utils/public';

interface SnakeCell {
  direction: Direction, // 方向
  x: number, // x坐标 
  y: number, // y坐标
}

export class Snake {
  body: SnakeCell[];
  constructor() {
    this.body = [];
  }

  move() {

  }

  eat() {
    
  }

  /**
   * 生成一条蛇
   * @param {Array} filedSize 场地规格
   * @param {Number} length 蛇初始长度
   */
  create(filedSize: [number, number], length: number) {
    // 蛇头初始化时离墙边的最短距离，防止开局撞墙
    const safeDistance: number = 2;
    // 随机一个初始方向
    const direction: Direction = getRandDirection();
    

  }
}