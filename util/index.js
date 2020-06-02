module.exports= {
    checkUser: (user)=> {
        if(Object.keys(user) === 0) throw new Error("You are not authenticated yet")
    }
}