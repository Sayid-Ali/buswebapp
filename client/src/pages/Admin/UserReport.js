import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    border: "1px solid black",
  },
});

// Create UserReport component
const UserReport = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Registered Users</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Name</Text>
          <Text style={styles.tableCell}>Email</Text>
          <Text style={styles.tableCell}>Status</Text>
          <Text style={styles.tableCell}>Role</Text>
        </View>
        {/* Render table rows based on the data passed */}
        {data.users.map((user) => (
          <View style={styles.tableRow} key={user.id}>
            <Text style={styles.tableCell}>{user.firstName}</Text>
            <Text style={styles.tableCell}>{user.email}</Text>
            <Text style={styles.tableCell}>
              {user.isBlocked ? "Blocked" : "Active"}
            </Text>
            <Text style={styles.tableCell}>
              {user.isAdmin
                ? "Admin"
                : user.isOperator
                ? "Operator"
                : "User"}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default UserReport;
