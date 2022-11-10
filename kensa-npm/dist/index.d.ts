export declare const getContext: ({ req, res }: any, api: string, db: any) => Promise<{
    req: any;
    res: any;
    db: any;
    projectId: any;
}>;
export declare const getProjectId: (apiKey: any) => Promise<any>;
export declare const insertMetrics: (response: any, projectId: string) => Promise<any>;
export declare const insertMetricsDev: (response: any, projectId: string) => Promise<any>;
export declare const kensaPlugin: {
    requestDidStart(requestContext: any): Promise<{
        didEncounterErrors(): Promise<void>;
        willSendResponse(context: any): Promise<void>;
    }>;
};
