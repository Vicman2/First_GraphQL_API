module.exports= {
    checkUser: (user)=> {
        if(!user) throw new Error("You are not authenticated yet")
    }
}