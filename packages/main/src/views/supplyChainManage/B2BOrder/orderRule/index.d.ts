export interface baseModeConfigItem {
    key: string;
    label: string;
    type: any; //待填
    placeholder?: string;
    isCustom?: boolean;//是否自定义组件
    prepend?: boolean;
    append?: boolean;
    show?: boolean;
    options?: any[];
    rules?: any[];
    operatorOptions?: Array<{ label: string; value: string }>;
    serializeType?: 'tag' | 'double' | 'none' | 'exist' | 'cascader' | 'tagSub' | 'postcode';
    headerTips?: boolean,
    maxCollapseTags?: number,
    appendOptions?:Array<{ label: string; value: string }>;
}



export interface configList {
    name:string,
    key:string,
    model:baseModeConfigItem[]
}
export interface BaseModel {
    operator?:string,
    leftSide?:any,
    rightSides?:any[],
    configs?:any[]
}