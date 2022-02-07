public class Application {
    public Object prcess(Object target, Definition definition, IFactory factory) {
        Class<?> clazz = definition.getClazz();
        ConfigProperties config = clazz.getAnnotation(ConfigProperties.class);
        if (config == null) {
            return target;
        }
        String location = config.value();
        if (!location.startsWith(File.separator)) {
            location = File.separator + location;
        }

        URL url = clazz.getResource(location);
        Properties props = new Properties();
        try {
            props.load(url.openStream());
            // 这个只是对properties的封装，就当他是普通properties好了
            PropertiesConfig propsConfig = new PropertiesConfig();
            propsConfig.setProperties(props);
            Set<String> keys = props.stringPropertyNames();
            for (String propName : keys) {
                String fieldName = propName.replace(config.prefix() + ".", "");
                try {
                    // 按照properties的key，去掉前缀后读取类的字段Field
                    Field field = clazz.getDeclaredField(fieldName);
                    // 开启操作权限
                    field.setAccessible(true);
                    // 字段不是string型就需要转换一下
                    if (field.getType() != String.class) {
                        // 获取类型转换器
                        ICovertor covertor = Covertors.getCovertor(String.class, field.getType());
                        if (covertor != null) {
                            // 转换类型并且注入
                            field.set(target, covertor
                                    .covert(propsConfig.get(propName)));
                        } else {
                            // 反向获取类型转换器（这里的转换器接口
                            // 是双向的，其实这样区分方向转换不是很好，
                            // 但是我现在没有来得及改他。
                            covertor = Covertors
                                    .getCovertorRev(field.getType(),
                                            String.class);
                            // 转换并注入， 其实这里应该判空，
                            // 但是当时应该是我忘记了
                            field.set(target, covertor.covertRev(propsConfig.get(propName)));
                        }
                    } else {
                        // 类型一致，直接注入
                        field.set(target, propsConfig.get(propName));
                    }
                } catch (Exception e) {
                    // 注入失败也无所谓，无视这个字段下一个注入
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return target;
    }
}
