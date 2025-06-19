import { useEffect, useState } from "react";
import {
  fetchUsers,
  updateUser,
  deleteUser,
  createUser,
  type User,
} from "../APIs/customerApi";
import AdminSidebar from "../components/adminSidebar";

export default function CustomerManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<
    Partial<User> & { confirmPassword?: string }
  >({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
    address: "",
    firstName: "",
    lastName: "",
    DOB: "",
    gender: "",
    role: "user",
    image: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<
    Partial<User> & { confirmPassword?: string }
  >({});

  useEffect(() => {
    fetchUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch users", err);
      });
  }, []);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (number: string) => /^\d{10}$/.test(number);
  const isPasswordValid = (password: string) =>
    password.length >= 6 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[\W_]/.test(password);

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;
    return score;
  };

  const passwordStrengthLabel = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Medium";
      case 4:
        return "Strong";
      case 5:
        return "Very Strong";
      default:
        return "";
    }
  };

  const validateUser = (user: Partial<User> & { confirmPassword?: string }) => {
    const errs: { [key: string]: string } = {};
    if (!user.username) errs.username = "Username is required";
    if (!user.email || !isValidEmail(user.email))
      errs.email = "Valid email is required";
    if (!user.password || !isPasswordValid(user.password))
      errs.password =
        "Password must have at least 6 characters, uppercase, lowercase, number & special character";
    if (user.password !== user.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (!user.number || !isValidPhone(user.number))
      errs.number = "Phone number must be 10 digits";
    if (!user.firstName) errs.firstName = "First name is required";
    if (!user.lastName) errs.lastName = "Last name is required";
    if (!user.address) errs.address = "Address is required";
    if (!user.gender) errs.gender = "Gender is required";
    if (!user.DOB) {
      errs.DOB = "Date of birth is required";
    } else {
      const dob = new Date(user.DOB);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      if (age < 15) errs.DOB = "User must be at least 15 years old";
    }
    return errs;
  };

  const handleAddUser = async () => {
    const validationErrors = validateUser(newUser);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const res = await createUser(newUser);
      setUsers((prev) => [...prev, res.data]);
      setNewUser({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        number: "",
        address: "",
        firstName: "",
        lastName: "",
        DOB: "",
        gender: "",
        role: "user",
        image: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Failed to create user", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const startEditing = (user: User) => {
    setEditingUserId(user._id);
    setEditValues({ ...user, confirmPassword: user.password || "" });
  };

  const saveEdit = async () => {
    if (!editingUserId) return;
    const validationErrors = validateUser(editValues);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const res = await updateUser(editingUserId, editValues);
      setUsers((prev) =>
        prev.map((u) => (u._id === editingUserId ? res.data : u))
      );
      setEditingUserId(null);
      setEditValues({});
      setErrors({});
    } catch (err) {
      console.error("Failed to update user", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Customer Manager
        </h2>

        {/* Add User Section */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "username",
            "email",
            "password",
            "confirmPassword",
            "number",
            "address",
            "firstName",
            "lastName",
            "DOB",
            "gender",
            "image",
          ].map((field) => (
            <div key={field}>
              {field === "gender" ? (
                <select
                  className="border p-2 rounded w-full"
                  value={newUser.gender}
                  onChange={(e) =>
                    setNewUser({ ...newUser, gender: e.target.value })
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <>
                  <input
                    type={
                      field === "DOB"
                        ? "date"
                        : field.toLowerCase().includes("password")
                        ? "password"
                        : "text"
                    }
                    placeholder={
                      field === "confirmPassword" ? "Confirm Password" : field
                    }
                    value={(newUser as any)[field] || ""}
                    onChange={(e) =>
                      setNewUser({ ...newUser, [field]: e.target.value })
                    }
                    className="border p-2 rounded w-full"
                  />
                  {field === "password" && newUser.password && (
                    <p
                      className={`text-sm ${
                        getPasswordStrength(newUser.password) >= 4
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      Strength:{" "}
                      {passwordStrengthLabel(
                        getPasswordStrength(newUser.password)
                      )}
                    </p>
                  )}
                  {errors[field] && (
                    <p className="text-red-600 text-sm">{errors[field]}</p>
                  )}
                </>
              )}
            </div>
          ))}
          <div>
            <select
              className="border p-2 rounded w-full"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  role: e.target.value as "user" | "admin",
                })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="col-span-full">
            <button
              onClick={handleAddUser}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Add User
            </button>
          </div>
        </div>

        {/* Users Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="p-4 border rounded bg-gray-50 flex flex-col justify-between"
            >
              {editingUserId === user._id ? (
                <>
                  {[
                    "username",
                    "email",
                    "password",
                    "confirmPassword",
                    "number",
                    "address",
                    "firstName",
                    "lastName",
                    "DOB",
                    "gender",
                    "image",
                  ].map((field) => (
                    <div key={field}>
                      {field === "gender" ? (
                        <select
                          className="border p-2 rounded w-full mb-1"
                          value={editValues.gender}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              gender: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <>
                          <input
                            type={
                              field === "DOB"
                                ? "date"
                                : field.toLowerCase().includes("password")
                                ? "password"
                                : "text"
                            }
                            value={(editValues as any)[field] || ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                [field]: e.target.value,
                              })
                            }
                            className="border p-2 rounded w-full mb-1"
                          />
                          {field === "password" && editValues.password && (
                            <p
                              className={`text-sm ${
                                getPasswordStrength(editValues.password) >= 4
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }`}
                            >
                              Strength:{" "}
                              {passwordStrengthLabel(
                                getPasswordStrength(editValues.password)
                              )}
                            </p>
                          )}
                          {errors[field] && (
                            <p className="text-red-600 text-sm">
                              {errors[field]}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  <select
                    className="border p-2 rounded w-full mb-2"
                    value={editValues.role}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        role: e.target.value as "user" | "admin",
                      })
                    }
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveEdit}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingUserId(null);
                        setEditValues({});
                        setErrors({});
                      }}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-2">
                    <img
                      src={user.image || "https://via.placeholder.com/60"}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div className="text-sm">
                      <p className="font-semibold">
                        {user.firstName} {user.lastName} ({user.role})
                      </p>
                      <p>{user.email}</p>
                      <p>{user.number}</p>
                      <p>{user.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => startEditing(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded flex-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
