import { connect } from "mongoose";
import { DB_URI } from ".";

export const connectDb = ()=>{
    return connect(DB_URI)
}