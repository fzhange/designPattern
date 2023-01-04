public class Index {

    private static final String url = "jdbc:mysql://localhost:3306/demo?useUnicode=true&characterEncoding=UTF8&useSSL=false&serverTimezone=UTC";

    private static final String username = "root";

    private static final String password = "123456";

    private static DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public Person selectById(Long id) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 获取链接
            connection = DriverManager.getConnection(url, username, password);

            // 创建statement
            preparedStatement = connection.prepareStatement("select * from t_person where id = ?");
            preparedStatement.setLong(1, id);

            // 执行
            resultSet = preparedStatement.executeQuery();

            // 遍历结果集
            Person person = null;
            while (resultSet.next()) {
                Long realId = resultSet.getLong("id");
                String name = resultSet.getString("name");
                String mobile = resultSet.getString("mobile");
                int age = resultSet.getInt("age");
                Date createAt = resultSet.getDate("create_at");
                Date updateAt = resultSet.getDate("update_at");
                person = new Person();
                person.setId(realId);
                person.setName(name);
                person.setMobile(mobile);
                person.setAge(age);
                person.setCreateAt(createAt);
                person.setUpdateAt(updateAt);
            }
            return person;
        } catch (Exception e) {
            return null;
        } finally {
            // 关闭资源
            try {
                if (connection != null && !connection.isClosed())
                    connection.close();
                if (preparedStatement != null)
                    preparedStatement.close();
                if (resultSet != null)
                    resultSet.close();
            } catch (Exception e) {

            }
        }
    }

}

@Data
public class Person {

    private Long id;

    private String name;

    private String mobile;

    private Integer age;

    private Date createAt;

    private Date updateAt;

}