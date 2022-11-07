export declare const getProjectId: (apiKey: any) => Promise<any>;
export declare const insertMetrics: (response: any, projectId: number) => Promise<any>;
export declare const testPlugin: {
    requestDidStart(requestContext: any): Promise<{
        executionDidStart(executionRequestContext: any): Promise<{
            willResolveField({ source, args, contextValue, info }: any): (error: any, result: any) => void;
        }>;
        didEncounterErrors(): Promise<void>;
        willSendResponse(context: any): Promise<void>;
    }>;
};
export declare const getContext: ({ req, res }: any, api: string, db: any) => Promise<{
    req: any;
    res: any;
    db: any;
    projectId: any;
}>;
