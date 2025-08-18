import Header from "@components/Header";
import Loading from "@components/Loading";
import { saveUserInfo } from "@redux/slices/authSlice";
import { useGetAuthUserQuery } from "@services/rootApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  // Query: tự động thực thi khi gọi custom Hook
  // Mặc định RTK Query: luôn tự động Catching data
  const response = useGetAuthUserQuery();
  const dispatch = useDispatch();

  console.log(response);

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(saveUserInfo(response.data));
    }
  }, [response.isSuccess, dispatch, response.data]);

  // Phân biệt isLoading và isFetching:
  // Giống: đều là trạng thái boolean để bạn biết request đang diễn ra hay không
  // Khác: chúng khác nhau ở thời điểm được bật/tắt

  /* 
   - isLoading:
  + Ý nghĩa: Đang tải lần đầu tiên của query (chưa có dữ liệu trước đó)
  + Chỉ true: khi bạn chưa từng fetch dữ liệu cho query này
  + Tắt (false): ngay khi có dữ liệu trả về (hoặc lỗi), thậm chỉ là kể cả refetch lần sau
  + Không bật lại nếu gọi refetch hoặc polling (lúc đó sẽ dùng isFetching).
  + Dùng khi nào? => Hiển thị loader ban đầu
  */

  /*
    - isFetching:
  + Ý nghĩa: Đang fetch dữ liệu (bất kể là lần đầu hay refetch).
  + Bật true: Mỗi lần request diễn ra (đầu tiên hoặc khi API được refetch)
  + Tắt (false): khi request kết thúc.
  + Dùng khi nào? => Hiển thị trạng thái đang cập nhật dữ liệu
  */

  if (response.isLoading) {
    return <Loading />;
  }

  // if (!response?.data?._id) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div>
      <Header />
      <div className="bg-dark-200">
        <Outlet />
      </div>
    </div>
  );
};
export default ProtectedLayout;
