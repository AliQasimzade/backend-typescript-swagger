import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.users.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      isActive: true,
      role: 'ADMIN',
      updatedAt: new Date(),
    },
  });

  const modules = [
    {
      name: 'modules.adminTitle',
      key: 'admin-panel',
      icon: 'ModuleAdminIcon',
      display_order: 1,
      description: 'modules.adminSubtitle',
    },
    {
      name: 'modules.warehouseTitle',
      key: 'warehouse',
      icon: 'ModuleWarehouseIcon',
      display_order: 2,
      description: 'modules.warehouseSubtitle',
    },
    {
      name: 'modules.planTitle',
      key: 'plan',
      icon: 'ModulePlanIcon',
      display_order: 3,
      description: 'modules.planSubtitle',
    },
    {
      name: 'modules.labTitle',
      key: 'lab',
      icon: 'ModuleLabIcon',
      display_order: 4,
      description: 'modules.labSubtitle',
    },
    {
      name: 'modules.patternTitle',
      key: 'pattern',
      icon: 'ModulePatternIcon',
      display_order: 5,
      description: 'modules.patternSubtitle',
    },
    {
      name: 'modules.scalesTitle',
      key: 'scales',
      icon: 'ModulEscalesIcon',
      display_order: 6,
      description: 'modules.scalesSubtitle',
    },
    {
      name: 'modules.calibrationTitle',
      key: 'calibration',
      icon: 'ModuleCalibrationIcon',
      display_order: 7,
      description: 'modules.calibrationSubtitle',
    },
    {
      name: 'modules.scadaTitle',
      key: 'scada',
      icon: 'ModuleScadaIcon',
      display_order: 8,
      description: 'modules.scadaSubtitle',
    },
  ];

  for (const mod of modules) {
    await prisma.module.upsert({
      where: { key: mod.key },
      update: {},
      create: mod,
    });
  }

  const adminModule = await prisma.module.findUnique({
    where: { key: 'admin-panel' },
  });

  if (!adminModule) {
    throw new Error('Admin module not found');
  }

  const pages = [
    {
      name: 'modulePages.Role',
      key: 'role',
      icon: 'RoleIcon',
      display_order: 1,
    },
    {
      name: 'modulePages.Company',
      key: 'company',
      icon: 'CompanyIcon',
      display_order: 2,
    },
    {
      name: 'modulePages.Project',
      key: 'project',
      icon: 'ProjectIcon',
      display_order: 3,
    },
  ];

  for (const page of pages) {
    await prisma.modulePage.upsert({
      where: { key: page.key },
      update: {},
      create: {
        ...page,
        moduleId: adminModule.id_hash,
      },
    });
  }

  console.log('✅ Modules and pages seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
