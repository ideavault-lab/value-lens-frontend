"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  LogOut,
  Trash2,
  Pencil,
  Check,
  X,
  AlertTriangle,
  Bell,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCurrentUser } from "@/modules/auth/hooks/useAuth.hooks";
import Section from "@/modules/auth/components/profile-components/Section";
import EditableRow from "./profile-components/EditableRow";
import Row from "./profile-components/Row";
import Toggle from "@/components/ui/Toggle";

/**
 * Drop-in profile & account page.
 * Wire `handleSaveField`, `handleLogout`, and `handleDeleteAccount`
 * to your real mutations — they're stubbed with TODOs below.
 */
export default function ProfileContent(){
  const { data: user } = useCurrentUser();

  const [editingField, setEditingField] = useState<"name" | "email" | "phone" | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Loading your account…
      </div>
    );
  }

  const handleSaveField = (_field: string, _value: string) => {
    // TODO: call your update-profile mutation here
    setEditingField(null);
  };

  const handleLogout = () => {
    // TODO: call your logout mutation / clear session
  };

  const handleDeleteAccount = () => {
    if (confirmText !== "DELETE") return;
    // TODO: call your delete-account mutation here
    setDeleteOpen(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Header card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
        <div className="h-24 w-full bg-gradient-to-r from-primary/15 via-accent/20 to-primary/5" />

        <div className="flex flex-col items-start gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4 -mt-10">
            <div className="relative">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="h-20 w-20 rounded-full border-4 border-card object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-card bg-primary text-2xl font-semibold text-primary-foreground">
                  {user.firstName.charAt(0)}
                </div>
              )}
              <button
                className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-secondary text-muted-foreground transition-colors hover:bg-muted"
                aria-label="Change photo"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="pb-1 leading-tight">
              <h1 className="font-heading text-xl font-semibold tracking-[-0.02em] text-foreground">
                {user.fullName}
              </h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-1.5 rounded-full"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </Button>
        </div>
      </div>

      {/* Personal information */}
      <Section title="Personal information" icon={<UserIcon className="h-4 w-4" />}>
        <EditableRow
          label="Full name"
          value={user.fullName}
          editing={editingField === "name"}
          onEdit={() => setEditingField("name")}
          onCancel={() => setEditingField(null)}
          onSave={(v) => handleSaveField("name", v)}
        />
        <EditableRow
          label="Email address"
          value={user.email}
          icon={<Mail className="h-4 w-4 text-muted-foreground" />}
          editing={editingField === "email"}
          onEdit={() => setEditingField("email")}
          onCancel={() => setEditingField(null)}
          onSave={(v) => handleSaveField("email", v)}
          last
        />
        {/* <EditableRow
          label="Phone number"
          value={user.phone ?? "Not added"}
          icon={<Phone className="h-4 w-4 text-muted-foreground" />}
          editing={editingField === "phone"}
          onEdit={() => setEditingField("phone")}
          onCancel={() => setEditingField(null)}
          onSave={(v) => handleSaveField("phone", v)}
          last
        /> */}
      </Section>

      {/* Security */}
      <Section title="Security" icon={<Shield className="h-4 w-4" />}>
        <Row
          label="Password"
          description="Last changed a while ago"
          action={
            <Button variant="outline" size="sm" className="rounded-full">
              Change password
            </Button>
          }
        />
        <Row
          label="Two-factor authentication"
          description="Add an extra layer of security to your account"
          action={
            <Button variant="outline" size="sm" className="rounded-full">
              Enable
            </Button>
          }
          last
        />
      </Section>

      {/* Preferences */}
      <Section title="Preferences" icon={<Bell className="h-4 w-4" />}>
        <Row
          label="Email notifications"
          description="Valuation updates and market alerts"
          action={<Toggle defaultChecked />}
          last
        />
      </Section>

      {/* Danger zone */}
      <div className="mt-6 rounded-3xl border border-destructive/30 bg-destructive/5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-destructive">Delete account</h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              This permanently removes your profile, saved valuations, and vehicle history.
              This can't be undone.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            className="shrink-0 gap-1.5 rounded-full border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={() => setDeleteOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl border border-border bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-foreground">
                Delete your account?
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Type <span className="font-mono font-medium text-foreground">DELETE</span> to
                confirm. Your data will be permanently removed.
              </p>

              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                className="mt-4 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-destructive/50"
              />

              <div className="mt-5 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-full"
                  onClick={() => {
                    setDeleteOpen(false);
                    setConfirmText("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  disabled={confirmText !== "DELETE"}
                  onClick={handleDeleteAccount}
                  className="flex-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-40"
                >
                  Delete account
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}