import bcrypt from 'bcryptjs'
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hashSync(password, salt)
    return hashedPassword
}

export const verifyPassword = async (password, hashedPassword) => {
    const isValid = await bcrypt.compareSync(password, hashedPassword)
    return isValid
}