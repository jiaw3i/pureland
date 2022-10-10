import * as React from 'react';
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from 'react-router-dom';

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<PublicPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/protected"
                        element={
                            <RequireAuth>
                                <ProtectedPage />
                            </RequireAuth>
                        }
                    />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

function Layout() {
    return (
        <div>
            <AuthStatus />

            <ul>
                <li>
                    <Link to="/">公共页面</Link>
                </li>
                <li>
                    <Link to="/protected">受保护页面e</Link>
                </li>
            </ul>

            <Outlet />
        </div>
    );
}

interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(null);

    let signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUser(newUser);
            callback();
        });
    };

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };

    let value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return React.useContext(AuthContext);
}

function AuthStatus() {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>还未登录！</p>;
    }

    return (
        <p>
            欢迎 {auth.user}!{' '}
            <button
                onClick={() => {
                    auth.signout(() => navigate('/'));
                }}
            >
                登出
            </button>
        </p>
    );
}

function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

function LoginPage() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    let from = location.state?.from?.pathname || '/';

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let username = formData.get('username') as string;

        auth.signin(username, () => {
            // 送用户回去他们试图访问的页面
            // 使用 { replace: true } 保证我们不会把login放入history栈
            // 意味着当用户点击回退，他不会重新回退到login页面
            navigate(from, { replace: true });
        });
    }

    return (
        <div>
            <p>你必须登录去查看{from}页面</p>

            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input name="username" type="text" />
                </label>{' '}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

function PublicPage() {
    return <h3>这是公共页面</h3>;
}

function ProtectedPage() {
    return <h3>这是受保护页面</h3>;
}


/**
 * 模拟了通用的auth API, 比如 Firebase.
 */
const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },
    signout(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    }
};
