function getRandomSubject() {
  const courses = [
    "Mathematics",
    "Physics",
    "English",
    "Computer Science",
    "Dancing",
    "Chess",
    "Biology",
    "Chemistry",
    "Law",
    "Art",
    "Medicine",
    "Statistics",
  ];

  const randomIndex = Math.floor(Math.random() * courses.length);
  return courses[randomIndex];
}

export async function fetchUsers(count = 10) {
  try {
    const getUsersResponse = await fetch(
      `https://randomuser.me/api?results=${count}`,
    );
    const data = await getUsersResponse.json();

    const formattedUsers = data.results.map((user) => {
      return {
        id: user.login.uuid,
        full_name: `${user.name.first} ${user.name.last}`,
        gender: user.gender,
        age: user.dob.age,
        b_date: user.dob.date,
        city: user.location.city,
        country: user.location.country,
        email: user.email,
        phone: user.phone,
        picture_large: user.picture.large,
        course: getRandomSubject(),
        favorite: false,
        note: "note",
      };
    });

    let dbUsers = [];
    try {
      const getUsersFromDBResponse = await fetch(
        "http://localhost:3000/teachers",
      );
      dbUsers = await getUsersFromDBResponse.json();
    } catch (error) {
      console.log("Не вдалося доступитися до локальної db ", error);
    }

    return [...formattedUsers, ...dbUsers];
  } catch (error) {
    console.error("Помилка при завантажені", error);
    return [];
  }
}
