// Này chỉ là data mẫu tĩnh để có thể làm giao diện hoy nha
// Khi nào xong hết giao diện ii rồi làm backend lúc đó lấy data từ mongoDB
let date = new Date();
export const devices = [
    {
      id: 1,
      name: 'Nebulizer',
      status: 'Open',
      values:{'9:30':36,'10':40},
      level_val: 36,
      time_start:`${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      time_end:`${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    },
    {
        id: 2,
        name: 'Bulk',
        status: 'Close',
        values:{'9:30':30,'10':20},
        level_val: 30,
        time_start:`${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        time_end:`${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      },
  ];