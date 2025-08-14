import { Suspense } from "react";
import { Outlet } from "react-router-dom";

// Supports weights 100-900
import "@fontsource-variable/public-sans";

const RootLayout = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
        {/* <div>AABB</div> => sẽ đợi  */}
      </Suspense>
      {/* <div>123</div> => mặc định sẽ hiển thị luôn */}
    </div>
  );
};

export default RootLayout;
