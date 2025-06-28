import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import axios from "axios";

interface GroceryItem {
  name: string;
  quantity: string;
  category: string;
  completed: boolean;
}

interface GroceryListData {
  _id: string;
  name: string;
  items: GroceryItem[];
  createdAt: string;
  updatedAt: string;
}

function GroceryList() {
  const [lists, setLists] = useState<GroceryListData[]>([]);
  const [currentList, setCurrentList] = useState<GroceryListData | null>(null);
  const [newListName, setNewListName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("1");
  const [newItemCategory, setNewItemCategory] = useState("General");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:5000/api";

  // Fetch all grocery lists
  const fetchLists = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/grocery-lists`);
      setLists(response.data);
    } catch (err) {
      setError("Failed to fetch grocery lists");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new grocery list
  const createList = async () => {
    if (!newListName.trim()) {
      setError("Please enter a list name");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/grocery-lists`, {
        name: newListName,
        items: [],
      });
      setLists([response.data, ...lists]);
      setNewListName("");
      setError("");
    } catch (err) {
      setError("Failed to create grocery list");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load a specific grocery list
  const loadList = async (listId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/grocery-lists/${listId}`
      );
      setCurrentList(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load grocery list");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add item to current list
  const addItem = async () => {
    if (!currentList || !newItemName.trim()) {
      setError("Please enter an item name");
      return;
    }

    try {
      setLoading(true);
      const newItem: GroceryItem = {
        name: newItemName,
        quantity: newItemQuantity,
        category: newItemCategory,
        completed: false,
      };

      const updatedItems = [...currentList.items, newItem];
      const response = await axios.put(
        `${API_BASE_URL}/grocery-lists/${currentList._id}`,
        {
          name: currentList.name,
          items: updatedItems,
        }
      );

      setCurrentList(response.data);
      setNewItemName("");
      setNewItemQuantity("1");
      setNewItemCategory("General");
      setError("");
    } catch (err) {
      setError("Failed to add item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle item completion
  const toggleItem = async (itemIndex: number) => {
    if (!currentList) return;

    try {
      setLoading(true);
      const response = await axios.patch(
        `${API_BASE_URL}/grocery-lists/${currentList._id}/items/${itemIndex}`
      );
      setCurrentList(response.data);
    } catch (err) {
      setError("Failed to update item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete item from list
  const deleteItem = async (itemIndex: number) => {
    if (!currentList) return;

    try {
      setLoading(true);
      const updatedItems = currentList.items.filter(
        (_, index) => index !== itemIndex
      );
      const response = await axios.put(
        `${API_BASE_URL}/grocery-lists/${currentList._id}`,
        {
          name: currentList.name,
          items: updatedItems,
        }
      );
      setCurrentList(response.data);
    } catch (err) {
      setError("Failed to delete item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete entire list
  const deleteList = async (listId: string) => {
    if (!confirm("Are you sure you want to delete this list?")) return;

    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/grocery-lists/${listId}`);
      setLists(lists.filter((list) => list._id !== listId));
      if (currentList?._id === listId) {
        setCurrentList(null);
      }
    } catch (err) {
      setError("Failed to delete list");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Save current list
  const saveList = async () => {
    if (!currentList) return;

    try {
      setLoading(true);
      const response = await axios.put(
        `${API_BASE_URL}/grocery-lists/${currentList._id}`,
        {
          name: currentList.name,
          items: currentList.items,
        }
      );
      setCurrentList(response.data);
      setLists(
        lists.map((list) =>
          list._id === currentList._id ? response.data : list
        )
      );
    } catch (err) {
      setError("Failed to save list");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const categories = [
    "General",
    "Fruits & Vegetables",
    "Dairy",
    "Meat",
    "Grains",
    "Snacks",
    "Beverages",
    "Household",
  ];

  return (
    <Layout>
      <div
        style={{ minHeight: "80vh", backgroundColor: "#f8f9fa", width: "100%" }}
      >
        {/* Main Content (sidebar + current list) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "2rem",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "2rem 0",
          }}
        >
          {/* Left Sidebar - List Management */}
          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#28a745", marginBottom: "1rem" }}>
              📋 My Lists
            </h2>

            {/* Create New List */}
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>Create New List</h3>
              <input
                type="text"
                placeholder="Enter list name..."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginBottom: "0.5rem",
                }}
              />
              <button
                onClick={createList}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Creating..." : "Create List"}
              </button>
            </div>

            {/* Saved Lists */}
            <div>
              <h3 style={{ marginBottom: "1rem" }}>Saved Lists</h3>
              {lists.length === 0 ? (
                <p style={{ color: "#666", fontStyle: "italic" }}>
                  No lists yet. Create your first one!
                </p>
              ) : (
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {lists.map((list) => (
                    <div
                      key={list._id}
                      style={{
                        padding: "0.75rem",
                        border:
                          currentList?._id === list._id
                            ? "2px solid #28a745"
                            : "1px solid #e9ecef",
                        borderRadius: "5px",
                        marginBottom: "0.5rem",
                        cursor: "pointer",
                        backgroundColor:
                          currentList?._id === list._id ? "#f8f9fa" : "white",
                      }}
                      onClick={() => loadList(list._id)}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <h4 style={{ margin: "0 0 0.25rem 0" }}>
                            {list.name}
                          </h4>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.875rem",
                              color: "#666",
                            }}
                          >
                            {list.items.length} items •{" "}
                            {new Date(list.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteList(list._id);
                          }}
                          style={{
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            padding: "0.25rem 0.5rem",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Current List */}
          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {currentList ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <h2 style={{ color: "#28a745", margin: 0 }}>
                    {currentList.name}
                  </h2>
                  <button
                    onClick={saveList}
                    disabled={loading}
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0.5rem 1rem",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.6 : 1,
                    }}
                  >
                    {loading ? "Saving..." : "Save List"}
                  </button>
                </div>

                {/* Add New Item */}
                <div
                  style={{
                    marginBottom: "2rem",
                    padding: "1rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "5px",
                  }}
                >
                  <h3 style={{ marginBottom: "1rem" }}>Add New Item</h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr auto",
                      gap: "0.5rem",
                      alignItems: "end",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Item name..."
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Qty"
                      value={newItemQuantity}
                      onChange={(e) => setNewItemQuantity(e.target.value)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                      style={{
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={addItem}
                      disabled={loading}
                      style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "0.5rem 1rem",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.6 : 1,
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Items List */}
                <div>
                  <h3 style={{ marginBottom: "1rem" }}>
                    Items ({currentList.items.length})
                  </h3>
                  {currentList.items.length === 0 ? (
                    <p style={{ color: "#666", fontStyle: "italic" }}>
                      No items yet. Add some items to your list!
                    </p>
                  ) : (
                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                      {currentList.items.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.75rem",
                            border: "1px solid #e9ecef",
                            borderRadius: "5px",
                            marginBottom: "0.5rem",
                            backgroundColor: item.completed
                              ? "#f8f9fa"
                              : "white",
                            textDecoration: item.completed
                              ? "line-through"
                              : "none",
                            opacity: item.completed ? 0.6 : 1,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleItem(index)}
                            style={{ marginRight: "0.75rem" }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: "bold" }}>
                              {item.name}
                            </div>
                            <div
                              style={{ fontSize: "0.875rem", color: "#666" }}
                            >
                              Qty: {item.quantity} • Category: {item.category}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteItem(index)}
                            style={{
                              backgroundColor: "#dc3545",
                              color: "white",
                              border: "none",
                              borderRadius: "3px",
                              padding: "0.25rem 0.5rem",
                              cursor: "pointer",
                              fontSize: "0.75rem",
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <h2 style={{ color: "#666", marginBottom: "1rem" }}>
                  Select a List
                </h2>
                <p style={{ color: "#666" }}>
                  Choose a list from the sidebar to view and edit its items.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default GroceryList;
