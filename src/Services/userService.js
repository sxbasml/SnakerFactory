/*  Simple auth en localStorage (sin backend) */
const LS = {
  get: (k,f)=>JSON.parse(localStorage.getItem(k)) ?? f,
  set: (k,v)=>localStorage.setItem(k,JSON.stringify(v)),
};

let user  = LS.get('user', null);
let users = LS.get('users', []);

export const userService = {
  current : () => user,

  login(username, password){
    const u = users.find(x=>x.username===username);
    if (u && u.password===password){
      user=u; LS.set('user',user); return {ok:true};
    }
    return {ok:false,msg:'Contraseña incorrecta'};
  },

  register(username, password){
    if (users.find(x=>x.username===username))
      return {ok:false,msg:'Usuario ya existe'};
    const u={username,password};
    users.push(u); LS.set('users',users);
    user=u; LS.set('user',user);  return {ok:true};
  },

  logout(){ user=null; LS.set('user',null); }
};
