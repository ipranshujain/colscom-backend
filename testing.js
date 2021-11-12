import bcrypt from "bcryptjs";
const ans = await bcrypt.hash("learning", 10);
console.log(await bcrypt.compare("learning", ans));
