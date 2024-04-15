import bcrypt  from 'bcrypt';

export const hashPassword = async(pass)=>{
    try {
        const saltRound = 10;
        const hashedPass = await bcrypt.hash(pass,saltRound);
        return hashedPass;
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async(pass,hashedPass)=>{
    const comparedPass = await bcrypt.compare(pass,hashedPass)
    return comparedPass;
}