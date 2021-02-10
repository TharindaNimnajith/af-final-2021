const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const UserModel = require('../models/users.model')

const addUser = async (req, res) => {
  let existingUser

  let {
    firstName,
    lastName,
    email,
    password
  } = req.body

  try {
    existingUser = await UserModel.findOne({
      email: email
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  if (existingUser) {
    res.send({
      status: 409,
      message: 'A user with the same email already exists.'
    })
  }

  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 10)
  })

  try {
    await newUser.save()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  await sendEmail(email)

  res.send({
    status: 201,
    message: 'Congratulations! You have successfully registered as a student in iLearn. ' +
      'Now please login to iLearn and start your learning journey right now!'
  })
}

const addAdmin = async (req, res) => {
  let existingUser

  let {
    firstName,
    lastName,
    email,
    password
  } = req.body

  try {
    existingUser = await UserModel.findOne({
      email: email
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  if (existingUser) {
    res.send({
      status: 409,
      message: 'A user with the same email already exists.'
    })
  }

  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 10),
    userType: 'Admin'
  })

  try {
    await newUser.save()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 201,
    message: 'Administrator added successfully!'
  })
}

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'it18149654@gmail.com',
    pass: process.env.PASSWORD
  }
})

const sendEmail = async email => {
  let info = {
    from: 'it18149654@gmail.com',
    to: email,
    subject: 'Welcome to iLearn!',
    text:
      `Congratulations!
      You have successfully registered as a student.
      Start your learning journey today!
      Thank you!
      This is an auto-generated email.
      If this has been sent by mistake, please delete this without sharing this.
      All rights reserved.`,
    html:
      `<div style="margin: 0; padding: 0; background-color: #f2f2f2; font-family: arial, serif;">
      <table style="margin: 0 auto; background: white; max-width: 500px; padding-bottom: 0; border-top: 5px solid #588dde; border-bottom: 5px solid #588dde; width: 100%;">
      <tr style="background: rgb(237, 243, 255); padding-left: 20px; padding-right: 20px;">
      <td>
      <table align="left" style="width: 100%;">
      <tr>
      <td style="padding: 10px;">
      <h1 style="text-align: center; color: #1a1a72;">Congratulations!</h1>
      <h2 style="margin-top:25px; margin-bottom: 0; color: #4db0c4; font-weight: 400; font-size: medium;">You have successfully registered as a student.</h2>
      <h2 style="margin-top:20px; margin-bottom: 0; color: #4db0c4; font-weight: 400; font-size: medium;">Start your learning journey today!</h2>
      </td>
      </tr>
      <tr style="background: rgb(237, 243, 255); padding-left: 20px; padding-right: 20px;">
      <td>
      <table align="left" style="width: 100%;">
      <tr>
      <td style="padding: 10px;">
      <h2 style="margin-top:25px; margin-bottom: 0; color: #4db0c4; font-weight: 400; font-size: medium;">Thank you!</h2>
      <h4 style="margin-top:20px; margin-bottom: 0; color: #4db0c4; font-weight: 400; font-size: medium;">This is an auto-generated email.</h4>
      <h4 style="margin-top:20px; margin-bottom: 0; color: #4db0c4; font-weight: 400; font-size: medium;">If this has been sent by mistake, please delete this without sharing this.</h4>
      <h4 style="margin-top:20px; margin-bottom: 0; color: #4db0c4; font-weight: 400; font-size: medium;">All rights reserved.</h4>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </div>`
  }

  transporter.sendMail(info, (error, data) => {
    if (error) {
      console.error(error)
      console.error('Email sending failed! Please try again.')
    } else {
      console.error(data)
      console.error('An email is sent successfully to ' + email + '.')
    }
  })
}

const updateUser = async (req, res) => {
  let user
  let existingUser

  const {
    id
  } = req.params

  const {
    firstName,
    lastName,
    email,
    password,
    userType
  } = req.body

  try {
    user = await UserModel.findById(id)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  try {
    existingUser = await UserModel.findOne({
      email: email
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  if (existingUser && email !== user.email) {
    res.send({
      status: 409,
      message: 'A user with the same email already exists.'
    })
  }

  user.firstName = firstName
  user.lastName = lastName
  user.email = email
  user.password = bcrypt.hashSync(password, 10)
  user.userType = userType

  try {
    await user.save()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    message: 'User updated successfully!'
  })
}

const deleteUser = async (req, res) => {
  let user

  const {
    id
  } = req.params

  try {
    user = await UserModel.findById(id)
    await user.remove()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    message: 'User deleted successfully!'
  })
}

const getUser = async (req, res) => {
  let user

  const {
    id
  } = req.params

  try {
    user = await UserModel.findById(id)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    user: user
  })
}

const getUserList = async (req, res) => {
  let userList

  try {
    userList = await UserModel.find()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    userList: userList
  })
}

exports.addUser = addUser
exports.addAdmin = addAdmin
exports.updateUser = updateUser
exports.deleteUser = deleteUser
exports.getUser = getUser
exports.getUserList = getUserList
