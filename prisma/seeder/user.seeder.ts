import { PrismaService } from '../../src/shared/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

const UserSeeder = async () => {
  const user = {
    email: 'admin@admin.com',
    password: 'password',
    display_name: 'Admin',
  };

  await new PrismaService().user.create({
    data: {
      email: user?.email,
      password: await bcrypt?.hash(user?.password, 10),
      displayName: user?.display_name,
    },
  });

  console.log('User has been seed.');
};

export default UserSeeder;
