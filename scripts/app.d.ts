declare namespace ISnake {
    export interface Grid {
        x: number;
        y: number;
        prev?: Grid;
        next?: Grid;
        direction?: string;
    }
}

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};