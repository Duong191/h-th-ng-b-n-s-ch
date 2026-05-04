/** File này chuyển đổi dữ liệu user từ DB sang format frontend. */
type DbUserRow = {
  id: number | string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string | null;
  gender?: string | null;
  birth_date?: Date | string | null;
  avatar_url?: string | null;
  is_active?: boolean | number;
  created_at?: Date | string;
  updated_at?: Date | string;
  role_name?: string | null;
};

export const mapDbUserToFeUser = (row: DbUserRow) => {
  const firstName = row.first_name ?? "";
  const lastName = row.last_name ?? "";
  const birthdayDate = row.birth_date ? new Date(row.birth_date) : null;

  return {
    id: String(row.id),
    name: `${firstName} ${lastName}`.trim(),
    firstName,
    lastName,
    email: row.email,
    password: "",
    phone: row.phone ?? "",
    gender: row.gender ?? "",
    birthday: {
      day: birthdayDate ? String(birthdayDate.getDate()).padStart(2, "0") : "",
      month: birthdayDate ? String(birthdayDate.getMonth() + 1).padStart(2, "0") : "",
      year: birthdayDate ? String(birthdayDate.getFullYear()) : ""
    },
    role: (row.role_name ?? "user") as "user" | "admin" | "staff",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    avatar: row.avatar_url ?? "",
    isActive: row.is_active === true || row.is_active === 1,
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : undefined
  };
};
