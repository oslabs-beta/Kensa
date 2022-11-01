export declare const getProjectId: (apiKey: any) => Promise<any>;
export declare const insertMetrics: (response: any, projectId: number) => Promise<any>;
export declare const testPlugin: {
    requestDidStart(requestContext: any): Promise<{
        executionDidStart(executionRequestContext: any): Promise<{
            willResolveField({ source, args, contextValue, info }: any): (error: any, result: any) => void;
        }>;
        didResolveOperation(context: any): Promise<void>;
        willSendResponse(context: any): Promise<void>;
    }>;
};
