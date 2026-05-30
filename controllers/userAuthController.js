const { User } = require('../models');

const showRegister = (req, res) =>
  res.render('user-auth/register', { layout: false, error: null });

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password_hash: password });
    req.session.userId = user.id;
    req.session.user   = { id: user.id, name: user.name };
    res.redirect('/customer/dashboard');
  } catch (err) {
    const msg = err.name === 'SequelizeUniqueConstraintError'
      ? 'Ya existe una cuenta con ese email.'
      : 'Error al crear la cuenta.';
    res.render('user-auth/register', { layout: false, error: msg });
  }
};