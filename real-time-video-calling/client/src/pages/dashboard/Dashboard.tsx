import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { LogOutIcon, MenuIcon } from "lucide-react";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import type { User } from "@/types";

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(
    (u) =>
      u.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
      localStorage.removeItem("user");
      updateUser(null);
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  const userData = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
      fullName: "John Doe",
      userName: "johndoe",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
      fullName: "Jane Smith",
      userName: "janesmith",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-100">
      <Sheet>
        <SheetTrigger className="p-2 m-4">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="flex flex-col gap-6">
            <SheetTitle>Users</SheetTitle>
            <div>
              <Input
                className="py-4"
                type="text"
                placeholder="Search user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              {userData.map((user) => (
                <Item
                  className="shadow-lg items-center justify-center"
                  key={user.email}
                >
                  <ItemMedia
                    variant="icon"
                    className="w-12 h-12 rounded-full! overflow-hidden"
                  >
                    <img
                      className="size-12 object-cover"
                      src={user.profilePicture}
                      alt={user.userName}
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{user.userName}</ItemTitle>
                    <ItemDescription>{user.email}</ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </div>
          </SheetHeader>
          <SheetFooter>
            <Button className="py-6" onClick={handleLogout}>
              <span>
                <LogOutIcon />
              </span>
              Logout
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Dashboard;
