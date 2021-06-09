export type Application = {
  id: string;
  state: string;
  submitParams: {
    name: string;
    file: string;
    numExecutors: number;
    executorCores: number;
    executorMemory: string;
    driverCores: number;
    driverMemory: string;
    args: string[];
    conf: Record<string, string>;
  };
};

export type ApplicationLog = {
  log: string;
};

export type BatchPage = {
  applications?: Application[];
  from: number;
  total: number;
};
