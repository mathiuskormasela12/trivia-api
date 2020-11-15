// akun
// admin
email : admin@gmail.com
password: Adm1n

// user biasa
email : mathius12@gmail.com
password : Mathius12

// Daftar Endpoint 

1. Login
endpoint '/api/login'
request body = email dan password

2. Register User (Hanya bisa di akses admin)
endpoint = '/api/register'
request body = full_name, email, password, repeatPassword, role (admin atau user)

3. Mengambil Semua pertanyaan tanpa jawaban (Hanya bisa di akses user)
endpoint = '/api/questions/user'

4. Menjawab Pertanyaan (hanya user)
endpoint = '/api/answer'
request body = question_id dan answer

5. Mengambil semua data semua user beserta score (hanya admin)
endpoint = '/api/admin/user/detail'

6. Mengambil semua data user yg aktif beserta score (hanya user)
endpoint = '/api/user/detail'

7. Menambah pertanyaan (hanya admin)
endpoint = '/api/questions'
req body = type, question, correctAnswer

8. Mengambil semua pertanyaan (admin)
endpoint = '/api/questions/admin'

