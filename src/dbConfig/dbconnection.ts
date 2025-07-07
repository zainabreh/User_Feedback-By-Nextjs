import mongoose from "mongoose"

export const dbConnection = async ()=>{
    try {

        await mongoose.connect(process.env.DB_URL!)

        const connection = mongoose.connection

        connection.on("connected",()=>{
            console.log("connection successfully");
        })

        connection.on("error",(err)=>{
            console.log("Error in connecting to DB, make sure db is up and running" + err);
            
        })
        
    } catch (error) {
        console.log("Somthing went wrong in connecting to DB" + error);
        
    }
}