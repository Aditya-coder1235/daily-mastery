const groq=require('../utils/groqClient')

const generateAi=async (req,res)=>{
    try {
        let {prompt}=req.body

        if(!prompt){
            return res.status(400).json({message:"prompt required"});
        }

        const response = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.1-8b-instant", 
        });

        res.status(200).json({
            message:response
        })
        
    } catch (error) {
        res.status(500).json({ message: "AI generation failed" });
    }
}

module.exports=generateAi