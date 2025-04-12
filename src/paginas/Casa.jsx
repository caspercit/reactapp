import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Casa = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://13.58.169.56/usuarios');
            
            if (!response.ok) throw new Error('Error al conectar con el servidor');
            
            const data = await response.json();
            setUsers(data);
            setError('');
        } catch (err) {
            setError(err.message);
            toast.error(`🔥 Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (id === currentUser?.id) {
            toast.warning('No puedes eliminarte a ti mismo');
            return;
        }

        const confirm = window.confirm('¿Estás seguro de eliminar este usuario permanentemente?');
        if (!confirm) return;

        try {
            const response = await fetch(`https://13.58.169.56/usuarios/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.code === 'foreign_key_constraint') {
                    throw new Error('Este usuario tiene registros asociados');
                }
                throw new Error(data.message || 'Error al eliminar usuario');
            }

            // Actualización optimista
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            toast.success('Usuario eliminado correctamente');
            
        } catch (error) {
            console.error('Error al eliminar:', error);
            toast.error(error.message);
            fetchUsers(); // Recargar datos para mantener consistencia
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingScreen}>
                <div style={styles.holoLoader}></div>
                <p style={styles.loadingText}>CARGANDO DATOS...</p>
                <div style={styles.loadingBar}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.errorScreen}>
                <div style={styles.errorIcon}>⚠️</div>
                <p style={styles.errorMessage}>{error}</p>
                <button 
                    style={styles.retryButton}
                    onClick={fetchUsers}
                >
                    REINTENTAR
                </button>
            </div>
        );
    }

    return (
        <div style={styles.cyberContainer}>
            <div style={styles.glassCard}>
                <div style={styles.header}>
                    <h2 style={styles.title}>PANEL DE USUARIOS</h2>
                    <div style={styles.userWelcome}>
                        BIENVENIDO: <span style={styles.userName}>{currentUser?.nombre}</span>
                    </div>
                </div>
                
                <div style={styles.statsBar}>
                    <div style={styles.statItem}>
                        <div style={styles.statValue}>{users.length}</div>
                        <div style={styles.statLabel}>USUARIOS</div>
                    </div>
                    <div style={styles.statItem}>
                        <div style={styles.statValue}>{new Date().getFullYear()}</div>
                        <div style={styles.statLabel}>SISTEMA</div>
                    </div>
                </div>

                <div style={styles.usersGrid}>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id} style={styles.userCard}>
                                <div style={styles.userId}>ID: {user.id}</div>
                                <div style={styles.userInfo}>
                                    <div style={styles.userName}>{user.nombre}</div>
                                    <div style={styles.userEmail}>{user.correo}</div>
                                    <div style={styles.userPhone}>{user.telefono}</div>
                                </div>
                                <div style={styles.userActions}>
                                    <button 
                                        style={styles.editButton}
                                        onClick={() => navigate(`/editar/${user.id}`)}
                                    >
                                        EDITAR
                                    </button>
                                    <button 
                                        style={styles.deleteButton}
                                        onClick={() => handleDelete(user.id)}
                                        disabled={user.id === currentUser?.id}
                                    >
                                        ELIMINAR
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={styles.emptyState}>
                            NO HAY USUARIOS REGISTRADOS
                        </div>
                    )}
                </div>
            </div>
            
            <div style={styles.cornerDecoration}></div>
            <div style={styles.gridBackground}></div>
        </div>
    );
};

const styles = {
    cyberContainer: {
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#0a0a12',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Courier New', monospace",
        padding: '20px',
    },
    gridBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
            linear-gradient(rgba(20, 20, 40, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 20, 40, 0.8) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        zIndex: 0,
    },
    glassCard: {
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: 'rgba(20, 20, 40, 0.6)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        border: '1px solid rgba(100, 100, 200, 0.2)',
        boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 0 20px rgba(100, 150, 255, 0.1)
        `,
        padding: '40px',
        zIndex: 1,
    },
    header: {
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative',
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#00f0ff',
        textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
        letterSpacing: '2px',
        marginBottom: '10px',
    },
    userWelcome: {
        color: '#ffffff',
        fontSize: '16px',
        letterSpacing: '1px',
    },
    userName: {
        color: '#ff3366',
        fontWeight: 'bold',
    },
    statsBar: {
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        marginBottom: '40px',
    },
    statItem: {
        textAlign: 'center',
    },
    statValue: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#00f0ff',
        textShadow: '0 0 8px rgba(0, 240, 255, 0.5)',
    },
    statLabel: {
        fontSize: '14px',
        color: '#7f8c8d',
        letterSpacing: '1px',
    },
    usersGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    userCard: {
        backgroundColor: 'rgba(30, 30, 60, 0.4)',
        borderRadius: '12px',
        border: '1px solid rgba(100, 150, 255, 0.1)',
        padding: '20px',
        transition: 'all 0.3s ease',
        ':hover': {
            borderColor: 'rgba(0, 240, 255, 0.3)',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)',
        },
    },
    userId: {
        fontSize: '12px',
        color: '#7f8c8d',
        marginBottom: '10px',
    },
    userInfo: {
        marginBottom: '15px',
    },
    
    userEmail: {
        fontSize: '14px',
        color: '#00f0ff',
        marginBottom: '5px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    userPhone: {
        fontSize: '14px',
        color: '#27ae60',
    },
    userActions: {
        display: 'flex',
        gap: '10px',
    },
    editButton: {
        flex: 1,
        padding: '8px',
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        color: '#00f0ff',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        letterSpacing: '1px',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: 'rgba(0, 240, 255, 0.2)',
        },
    },
    deleteButton: {
        flex: 1,
        padding: '8px',
        backgroundColor: 'rgba(255, 51, 102, 0.1)',
        color: '#ff3366',
        border: '1px solid rgba(255, 51, 102, 0.3)',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        letterSpacing: '1px',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: 'rgba(255, 51, 102, 0.2)',
        },
        ':disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    },
    emptyState: {
        gridColumn: '1 / -1',
        textAlign: 'center',
        color: '#7f8c8d',
        padding: '40px',
        fontSize: '18px',
    },
    cornerDecoration: {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        width: '100px',
        height: '100px',
        borderRight: '2px solid rgba(0, 240, 255, 0.3)',
        borderBottom: '2px solid rgba(0, 240, 255, 0.3)',
    },
    loadingScreen: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a12',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    holoLoader: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: '3px solid transparent',
        borderTopColor: '#00f0ff',
        borderBottomColor: '#ff3366',
        animation: 'spin 1.5s linear infinite',
        boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
    },
    loadingText: {
        marginTop: '30px',
        color: '#00f0ff',
        fontSize: '16px',
        letterSpacing: '3px',
    },
    loadingBar: {
        width: '200px',
        height: '2px',
        backgroundColor: 'rgba(100, 150, 255, 0.2)',
        marginTop: '20px',
        position: 'relative',
        overflow: 'hidden',
        ':after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            backgroundColor: '#00f0ff',
            animation: 'loading 2s ease-in-out infinite',
        },
    },
    errorScreen: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a12',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    errorIcon: {
        fontSize: '50px',
        marginBottom: '20px',
    },
    errorMessage: {
        color: '#ff3366',
        fontSize: '18px',
        maxWidth: '80%',
        textAlign: 'center',
        marginBottom: '30px',
    },
    retryButton: {
        padding: '12px 24px',
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        color: '#00f0ff',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        letterSpacing: '1px',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: 'rgba(0, 240, 255, 0.2)',
        },
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
    '@keyframes loading': {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(200%)' },
    },
};

export default Casa;
