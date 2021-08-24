const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('config')
const User = require('../models/userModel')

passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser(async (id, done)=>{
    User.findById(id).then(user => done(null, user))
})

passport.use(new GoogleStrategy({
    clientID: config.get('clientID'),
    clientSecret: config.get('clientSecret'),
    callbackURL: '/auth/google/redirect'
},async (accessToken, refreshToken, profile, done)=>{
    const name = profile._json.name
    const email = profile._json.email
    const imagePath = profile._json.picture
    const extUser = await User.findOne({email})
    if(extUser){
        done(null, extUser)
    }else{
        let newUser = new User({
            name,
            email,
            imagePath
        })
        await newUser.save()
        done(null, newUser)
    }
}))


passport.use(new GithubStrategy({
    clientID: config.get('githubClientID'),
    clientSecret: config.get('githubClientSecret'),
    callbackURL: '/auth/github/redirect',
    scope: ['user:email'],
},async (accessToken,refreshToken,profile,done)=>{
    const name = profile._json.name
    const email = profile.emails[0].value
    const imagePath = profile._json.avatar_url
    const extUser = await User.findOne({email})
    if(extUser){
        done(null, extUser)
    }else{
        let newUser = new User({
            name,
            email,
            imagePath
        })
        await newUser.save()
        done(null, newUser)
    }
}))


passport.use(new FacebookStrategy({
    clientID: config.get('facebookAppID'),
    clientSecret: config.get('facebookAppSecret'),
    profileFields: ['email', 'displayName', 'picture.type(large)'],
    callbackURL: "http://localhost:3000/auth/facebook/redirect"
  },async (accessToken, refreshToken, profile, done)=>{
    const name = profile.displayName
    const email = profile.emails[0].value
    const imagePath = profile.photos[0].value
    const extUser = await User.findOne({email})
    if(extUser){
        done(null, extUser)
    }else{
        let newUser = new User({
            name,
            email,
            imagePath
        })
        await newUser.save()
        done(null, newUser)
    }
  }
));
