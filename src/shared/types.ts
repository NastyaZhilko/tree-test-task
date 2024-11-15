export type TreeNodeType = {
    id: number;
    name: string;
    children: TreeNodeType[];
};

export type ErrorResponse = {
    type: string;
    id: string;
    data: {
        message: string;
    };
};