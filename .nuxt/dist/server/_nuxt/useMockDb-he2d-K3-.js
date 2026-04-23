const useMockDb = () => {
  const getCollection = (collectionName) => {
    return [];
  };
  const addDoc = (collectionName, doc) => {
    const data = getCollection();
    const newDoc = { ...doc, id: Math.random().toString(36).substring(2, 9) };
    data.push(newDoc);
    return newDoc;
  };
  const updateDoc = (collectionName, id, updates) => {
    const data = getCollection();
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      return data[index];
    }
    return null;
  };
  const deleteDoc = (collectionName, id) => {
    const data = getCollection();
    data.filter((item) => item.id !== id);
  };
  const authenticate = (username, password, role) => {
    if (role === "etudiant") {
      const etudiants = getCollection();
      const user = etudiants.find(
        (e) => e.prenom.toLowerCase() === username.toLowerCase() && e.matricule === password
      );
      if (user) return { ...user, role: "etudiant", name: `${user.nom} ${user.prenom}` };
    } else if (role === "enseignant") {
      const enseignants = getCollection();
      const user = enseignants.find(
        (e) => e.prenom.toLowerCase() === username.toLowerCase() && e.matricule === password
      );
      if (user) return { ...user, role: "enseignant", name: `${user.nom} ${user.prenom}` };
    } else if (role === "secretariat" || role === "admin") {
      if (username === "admin" && password === "admin") {
        return { id: "A1", prenom: "Admin", nom: "System", email: "admin@system.com", role, name: "Admin System" };
      }
    }
    return null;
  };
  return {
    getCollection,
    addDoc,
    updateDoc,
    deleteDoc,
    authenticate
  };
};
export {
  useMockDb
};
//# sourceMappingURL=useMockDb-he2d-K3-.js.map
