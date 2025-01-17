package de.uni1.amos.filestorage.config;

import de.uni1.amos.filestorage.security.ApiKeyAuthentication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class SecurityConfig {

    @Autowired
    private ApiKeyAuthentication apiKeyAuthentication;

    @Bean
    public FilterRegistrationBean<ApiKeyAuthentication> apiKeyAuthFilter() {
        FilterRegistrationBean<ApiKeyAuthentication> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(apiKeyAuthentication);
        registrationBean.addUrlPatterns("/files/*");
        registrationBean.setOrder(Ordered.LOWEST_PRECEDENCE);
        return registrationBean;
    }
}
