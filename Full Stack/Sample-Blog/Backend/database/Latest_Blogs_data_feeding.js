const fileData = require("./data_saving");
const LatestBlogs = require("../models/Latest_Blogs_schema");
const optimization_for_feeding_data = require("./optimization_for_feeding_data");


async function Latest_Blogs_feeding() {
  const blogsData = [
    {
      id: 1,
      title: "Learn React",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      body: fileData.file1,
      image: "../../../images/home/hall.jpg",
    },
    {
      id: 2,
      title: "Learn Next.js",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      body: fileData.file2,
      image: "../../../images/home/Luxury.jpg"
    },
    {
      id: 3,
      title: "Learn JavaScript",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      body: fileData.file3,
      image: "../../../images/home/yatch.jpg",
    },
    {
      id: 4,
      title: "Learn TypeScript",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      body: fileData.file4,
      image: "../../../images/home/gold.jpg",
    },
  ];

  optimization_for_feeding_data(blogsData,'latestBlogsHash', LatestBlogs, 'Latest Blogs' )
 
}

module.exports = Latest_Blogs_feeding;
