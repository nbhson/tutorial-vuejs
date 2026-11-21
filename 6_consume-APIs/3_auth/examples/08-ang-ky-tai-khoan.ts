await api.post('/auth/register', { name, email, password })
router.push({ name: 'login', query: { registered: '1' } })
