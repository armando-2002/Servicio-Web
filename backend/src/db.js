/*import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();*/

/*import { PrismaClient } from '@prisma/client'

// Solución para Node.js v22 + ES Modules
const prisma = new PrismaClient({
  __internal: {
    engine: {
      enableEngine: false
    }
  }
})

export default prisma*/

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;