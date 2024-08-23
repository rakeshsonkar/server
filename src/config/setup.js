import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJsMongoose from '@adminjs/mongoose';
import * as Models from "../models/index.js";
import { COOKIE_PASSWORD, sessionStore } from "./config.js";


AdminJS.registerAdapter(AdminJsMongoose)

export const admin = new AdminJS({
    resources:[
        {
            resource:Models.Customer,
            options:{
                listProperties:["phone","role","isActivated"],
                filterProperties:["phone","role"],
            }
        },
        {
            resource:Models.DeliveryPartner,
            options:{
                listProperties:["email","role","isActivated"],
                filterProperties:["email","role"],
            }
        },
        {
            resource:Models.Admin,
            options:{
                listProperties:["email","role","isActivated"],
                filterProperties:["email","role"],
            }
        },
        {resource:Models.Branch}
    ],
    branding:{
        companyName:"Rkeshopping",
        withMadeWithLove:false
    },
    rootPath:"/admin",
});

export const buildAdminRouter= async (app)=>{
await AdminJSFastify.buildAuthenticatedRouter(admin,{},app,{
        store: sessionStore,
        saveUnintialized: true,
        secret: COOKIE_PASSWORD,
        cookie:{
            httpOnly:process.env.NODE_ENV === "production",
            secure
        }
    });
}