
declare global {
    // extending the Request type globaly
    namespace Express {
        interface Request {
            user?: {
                department: string;
                userId: number
                name: string;
                email: string;
                iat: number;
                role: string;
                SSN: number
            };

        }
    }
}


export type DecodedToken = {
    userId: number;
    name: string;
    email: string;
    iat: number;
    role: string;
    SSN: number;
    department: string
  };
export { };