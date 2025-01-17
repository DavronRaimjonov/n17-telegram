let data = [
  {
    user_id: "2",
    recerved_id: "3",
    text: "salom",
    id: "1",
  },
  {
    user_id: "2",
    recerved_id: "3",
    text: "Support",
    id: "2",
  },
  {
    user_id: "2",
    recerved_id: "3",
    text: "Support",
    id: "2",
  },
  {
    user_id: "2",
    recerved_id: "3",
    text: "Support",
    id: "2",
  },
  {
    user_id: "1",
    recerved_id: "3",
    text: "Support",
    id: "2",
  },
  {
    user_id: "1",
    recerved_id: "2",
    text: "Support",
    id: "2",
  },
  {
    user_id: "1",
    recerved_id: "3",
    text: "Support",
    id: "2",
  },
];
let user1 = "2";
let user2 = "2";

data = data.filter(
  (value) => value.user_id === user1 && value.recerved_id === user2
);

console.log(data);
