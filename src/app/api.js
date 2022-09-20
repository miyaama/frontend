import { days as allDays } from "./data";

export const getUsers = async () => {
  const users = await fetch("http://localhost:8080/api/users").then((data) =>
    data.json()
  );

  const parsedUsers = users.map((user) => {
    let total = 0;
    const days = user.Days.reduce((acc, day) => {
      const startHours = day.Start.split("-");

      const endHours = day.End.split("-");

      let timeWorkInMinutes =
        endHours[0] * 60 + +endHours[1] - (startHours[0] * 60 + +startHours[1]);

      let houres = Math.floor(timeWorkInMinutes / 60);
      let minutes = timeWorkInMinutes - houres * 60;

      total += timeWorkInMinutes;

      acc[new Date(day.Date).getDate()] = houres + ":" + minutes;
      return acc;
    }, {});

    const totalHoures = Math.floor(total / 60);
    const totalMinutes = total - totalHoures * 60;

    const resultUser = {
      key: user.id,
      user: user.Fullname,
      monthly: totalHoures + ":" + totalMinutes,
      ...days,
    };

    allDays.forEach((monthDay) => {
      if (!resultUser[monthDay]) {
        resultUser[monthDay] = "0:00";
      }
    });
    return resultUser;
  });

  return parsedUsers;
};
