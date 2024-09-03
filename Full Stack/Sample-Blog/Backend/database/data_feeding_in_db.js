const Latest_Blogs_data_feeding = require('./Latest_Blogs_data_feeding');
const All_blogs_data_feeding = require('./All_Blogs_data_feeding');

const data_feeding_in_db = async()=>{
    try {
        await Latest_Blogs_data_feeding()
    } catch (error) {
        console.error("Latest Blogs data feeding failed");
    }
    try {
        All_blogs_data_feeding()
    } catch (error) {
        console.error("All Blogs data feeding failed");
    }
}

module.exports = data_feeding_in_db