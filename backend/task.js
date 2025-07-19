import { Task} from "./models/task.js";
export const newtask = async (req, res, next)=>{
    const {title,  description} = req.body;
await Task.create({
    title,
    description,
    user:req.user,
});
 res.status(201).json({
    success:true,
    message:"task added successfully"
 })
};

export const getmytask = async(req, res, next)=>{

  const userid =  req.user._id;
  const tasks = await Task.find({user:userid}) 
    res.status(200).json({
        success:true,
        tasks,
    });
};

export const updateTask = async(req, res, next)=>{

const {id} = req.params;
const task = await Task.findById(id);

task.completed = !task.completed;
await task.save();

    res.status(200).json({
        success:true,
        task,
        message:" task updated",
    });
};

export const deletetask = async(req, res, next)=>{
const {id} = req.params;
const task = await Task.findById(id);
await task.deleteOne();
 
    res.status(200).json({
        success:true,
        message: "task deleted",
    });
};


export const getWeeklyDashboard = async (req, res, next) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6); 

    const tasks = await Task.find({
      user: req.user._id,
      createdAt: {
        $gte: sevenDaysAgo,
        $lte: today
      }
    });


    const summary = {};

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const key = d.toLocaleDateString("en-IN", { weekday: 'long' });
      summary[key] = { total: 0, completed: 0 };
    }

    tasks.forEach(task => {
      const day = new Date(task.createdAt).toLocaleDateString("en-IN", { weekday: 'long' });
      if (summary[day]) {
        summary[day].total++;
        if (task.completed) summary[day].completed++;
      }
    });

    res.status(200).json({
      success: true,
      message: "Weekly dashboard",
      summary
    });

  } catch (error) {
    next(error);
  }
};


