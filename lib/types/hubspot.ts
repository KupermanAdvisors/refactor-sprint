// HubSpot global type declarations

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
      meetings: {
        create: (options: { 
          portalId: string; 
          formInstanceId: string;
        }) => void;
      };
    };
  }
}

export {};
